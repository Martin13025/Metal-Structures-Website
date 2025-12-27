const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root", // твой MySQL пользователь
  password: "", // пароль
  database: "metal_site", // имя базы, которую создал
});

module.exports = db;
