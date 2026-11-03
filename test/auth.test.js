const assert = require('assert');
const authService = require('../src/services/authService');

async function runTests() {
  console.log('Running tests for AC-9 and AC-11...');

  // [AC-9] Valid credentials authenticate successfully
  try {
    const user = await authService.authenticateUser('student@test.com', 'Password123!');
    assert.strictEqual(user.username, 'student@test.com');
    console.log('✓ AC-9: valid credentials passed');
  } catch (err) {
    console.error('✗ AC-9 failed:', err);
    process.exit(1);
  }

  // [AC-9] Invalid credentials throw "Invalid username or password."
  try {
    await authService.authenticateUser('student@test.com', 'WrongPassword');
    assert.fail('Should have thrown');
  } catch (err) {
    assert.strictEqual(err.message, 'Invalid username or password.');
    console.log('✓ AC-9: invalid credentials message passed');
  }

  // [AC-11] Non-registered/non-student user access check
  try {
    const staffUser = { username: 'staff@test.com', role: 'staff', verified: 1 };
    authService.checkStudentAccess(staffUser);
    assert.fail('Should have thrown');
  } catch (err) {
    assert.strictEqual(err.message, 'You must be a registered student to book a room.');
    console.log('✓ AC-11: non-student access restriction passed');
  }

  console.log('All Step 2 tests passed successfully!');
}

runTests();
