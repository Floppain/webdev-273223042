const bcrypt = require('bcrypt');
const userRepository = require('../data/userRepository');

async function authenticateUser(username, password) {
  if (!username || !password) {
    throw new Error('Invalid username or password.');
  }

  const user = userRepository.findUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password.');
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new Error('Invalid username or password.');
  }

  return user;
}

function checkStudentAccess(user) {
  if (!user || user.role !== 'student' || !user.verified) {
    throw new Error('You must be a registered student to book a room.');
  }
  return true;
}

module.exports = {
  authenticateUser,
  checkStudentAccess,
};
