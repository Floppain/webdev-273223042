const assert = require('assert');
const roomService = require('../src/services/roomService');

function runTests() {
  console.log('Running tests for AC-1, AC-2, AC-10...');

  // [AC-1] Rooms list contains available rooms and fully appointed rooms are indicated
  const rooms = roomService.getRoomsForDashboard();
  assert(rooms.length > 0, 'Should return rooms');
  
  const fullyAppointedRoom = rooms.find(r => r.fullyAppointed);
  assert(fullyAppointedRoom, 'Should have at least one fully appointed room');
  console.log('✓ AC-1: fully appointed rooms identified successfully');

  // [AC-2] Unavailable rooms contain the exact reason text
  const unavailableRoom = rooms.find(r => !r.available);
  assert(unavailableRoom, 'Should have at least one unavailable room');
  assert(unavailableRoom.unavailableReason.includes('This room is not available today.'), 'Should state room not available today');
  assert(unavailableRoom.unavailableReason.includes('Reason:'), 'Should state the reason');
  console.log('✓ AC-2: unavailable room reason displayed successfully');

  // [AC-10] Dashboard data loading provides available rooms list
  const availableRooms = rooms.filter(r => r.available);
  assert(availableRooms.length > 0, 'Should have available rooms for dashboard');
  console.log('✓ AC-10: dashboard available rooms list verified');

  console.log('All Step 3 tests passed successfully!');
}

runTests();
