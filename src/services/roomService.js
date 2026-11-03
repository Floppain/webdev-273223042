const roomRepository = require('../data/roomRepository');

function getRoomsForDashboard() {
  const rooms = roomRepository.getAllRooms();
  return rooms.map(room => {
    return {
      id: room.id,
      name: room.name,
      type: room.type,
      capacity: room.capacity,
      available: room.available === 1,
      fullyAppointed: room.fully_appointed === 1,
      unavailableReason: room.unavailable_reason
    };
  });
}

module.exports = {
  getRoomsForDashboard,
};
