const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations_meta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const migrationsDir = path.join(__dirname, '../../migrations');
  if (fs.existsSync(migrationsDir)) {
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    for (const file of files) {
      const check = db.prepare('SELECT id FROM migrations_meta WHERE name = ?').get(file);
      if (!check) {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        db.transaction(() => {
          db.exec(sql);
          db.transaction(() => {
          db.exec(sql);
          db.prepare('INSERT OR IGNORE INTO migrations_meta (name) VALUES (?)').run(file);
        })();
        })();
        console.log(`Executed migration: ${file}`);
      }
    }
  }
}

runMigrations();

module.exports = db;
