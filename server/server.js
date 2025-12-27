const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db"); // mysql2/promise

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "secret_for_demo";

/* ================== AUTH ================== */

// Регистрация
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, password_hash]
    );

    res.json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(400).json({ error: "Email уже используется" });
  }
});

// Логин
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  try {
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Пользователь не найден" });
    }

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: "Неверный пароль" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка входа" });
  }
});

/* ================== MIDDLEWARE ================== */

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Нет токена" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Неверный токен" });
  }
}

/* ================== ADMIN ================== */

// Пользователи
app.get("/api/admin/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Доступ запрещен" });
  }

  try {
    const [results] = await db.query("SELECT id, name, email, role FROM users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Продукты (админка)
app.get("/api/admin/products", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Доступ запрещен" });
  }

  try {
    const [results] = await db.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Редактирование продукта
app.put("/api/admin/products/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Доступ запрещен" });
  }

  const { name, description, price } = req.body;

  try {
    await db.query(
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Ошибка обновления продукта:", err);
    res.status(500).json({ error: "Ошибка обновления продукта" });
  }
});

/* ================== PUBLIC ================== */

// Каталог
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("Ошибка /api/products:", err);
    res.status(500).json({ error: "Ошибка загрузки товаров" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
