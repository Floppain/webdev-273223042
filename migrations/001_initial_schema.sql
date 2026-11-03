CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('student', 'staff')),
  verified INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('lab', 'workstation')),
  capacity INTEGER NOT NULL,
  available INTEGER DEFAULT 1,
  fully_appointed INTEGER DEFAULT 0,
  unavailable_reason TEXT
);

-- Seed users (password for both is Password123!)
INSERT OR IGNORE INTO users (id, username, password_hash, role, verified) VALUES
(1, 'student@test.com', '$2b$10$kL0P6keFz3HqJay0qm1t/OtWR0gGkaePvOwHKTLqozBcdVbgK8JEG', 'student', 1),
(2, 'staff@test.com', '$2b$10$kL0P6keFz3HqJay0qm1t/OtWR0gGkaePvOwHKTLqozBcdVbgK8JEG', 'staff', 1);

-- Seed rooms
INSERT OR IGNORE INTO rooms (id, name, type, capacity, available, fully_appointed, unavailable_reason) VALUES
(1, 'Lab Alpha', 'lab', 30, 1, 0, NULL),
(2, 'Workstation 1', 'workstation', 1, 1, 1, NULL),
(3, 'Lab Beta', 'lab', 25, 0, 0, 'This room is not available today.\nReason: This room is already full!');
