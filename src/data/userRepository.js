const db = require('../data/db');

function findUserByUsername(username) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username);
}

module.exports = {
  findUserByUsername,
};
