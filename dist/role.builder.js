var common = require('common');

var roleBuilder = {
	run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            var sourceCloserthanSpawn = creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_SOURCES)) < creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS));
            var Spawn1full = Game.spawns["Spawn1"].energyCapacity == Game.spawns["Spawn1"].energy;
            if( (sourceCloserthanSpawn || Memory.spawner.toSpawn == true) && !Spawn1full)
            {
                var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                common.getEnergyFromSpawn(creep);
            }
        }



	}
};
module.exports = roleBuilder;