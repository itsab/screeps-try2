var common = require('common');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, roomName) {

        if(creep.pos.roomName != creep.memory.roomName && creep.memory.roomName != undefined)
        {
            const route = Game.map.findRoute(creep.room, creep.memory.roomName);
            if(route.length > 0) {
                creep.say(route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('collecting');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('upgrade');
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    var path = creep.pos.findPathTo(creep.room.controller);
                    console.log(JSON.stringify(path));
                    creep.moveByPath(path);
                }
            }
            else {
                /*var sources = creep.room.find(FIND_SOURCES);

                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }*/

                /*var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }*/
                common.getEnergyFromOutput(creep, 10);
                common.getEnergy(creep);
            }
        }


	}
};

module.exports = roleUpgrader;