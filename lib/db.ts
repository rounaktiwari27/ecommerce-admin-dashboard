import Database from "better-sqlite3";

const db = new Database("database.db");

//  PRODUCTS TABLE 
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )
`).run();

//  ADMINS TABLE 
db.prepare(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL
  )
`).run();

//  SEED SUPER ADMIN 
const adminExists = db
  .prepare("SELECT * FROM admins WHERE username = ?")
  .get("admin");

if (!adminExists) {
  db.prepare(
    "INSERT INTO admins (id, username, role) VALUES (?, ?, ?)"
  ).run(1, "admin", "superadmin");
}

export default db;