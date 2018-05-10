var common = require('common');

var roleBuilder = {
	run: function(creep) {
        if(creep.carry.energy == 0) {

            //check if the nearest source is closer than spawn or toSpawn is true
            if(creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_SOURCES)) < creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS)) || Memory.spawner.toSpawn == true)
            {
                var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                common.getEnergyFromSpawn(creep);
            }

        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};
module.exports = roleBuilder;