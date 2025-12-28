const db = require("./db");
const bcrypt = require("bcrypt");
const name = "Admin";
const email = "admin@metal-site.local";
const password = "admin123";

async function createAdmin() {
  const password_hash = await bcrypt.hash(password, 10);
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log("Админ уже существует");
      return;
    }
    
    db.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')",
      [name, email, password_hash],
      (err, result) => {
        if (err) throw err;
        console.log("Админ создан, ID:", result.insertId);
      }
    );
  });
}

createAdmin();

