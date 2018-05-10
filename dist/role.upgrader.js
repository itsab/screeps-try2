var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, roomName) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }

        console.log(roomName);
        console.log(Game.rooms[roomName]);
        if(creep.memory.upgrading) {
            if(creep.upgradeController(Game.rooms[roomName].controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[roomName].controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            /*var sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }*/

            var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;