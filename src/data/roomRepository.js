const db = require('../data/db');

function getAllRooms() {
  const stmt = db.prepare('SELECT * FROM rooms');
  return stmt.all();
}

function getAvailableRooms() {
  const stmt = db.prepare('SELECT * FROM rooms WHERE available = 1');
  return stmt.all();
}

module.exports = {
  getAllRooms,
  getAvailableRooms,
};
