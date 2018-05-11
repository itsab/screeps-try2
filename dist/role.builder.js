var common = require('common');

var roleBuilder = {
	run: function(creep) {

        if(creep.pos.roomName != creep.memory.roomName && creep.memory.roomName != undefined)
        {
            const route = Game.map.findRoute(creep.room, creep.memory.roomName);
            if(route.length > 0) {
                creep.say(route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('collecting');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('building');
            }

            if(creep.memory.building) {

                var repairTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { var calc = structure.hits / structure.hitsMax; return calc < 0.5; }
                });

                if(repairTargets.length > 0) {
                    var repairTarget = creep.pos.findClosestByPath(repairTargets);
                    if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairTarget);
                    }
                } else {
                    var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }

            }
            else {
                //collect energy
                //common.getEnergyFromContainers(creep);


                //checks if spawn are closer than next source
                var spawnCloserThanSource = creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_SOURCES)) > creep.pos.getRangeTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS));
                //forces builders to take spawn energy if spawn is full
                var Spawn1full = Game.spawns["Spawn1"].energyCapacity == Game.spawns["Spawn1"].energy;
                //force builders get sources when spawn1 is empty
                var Spawn1empty = Game.spawns["Spawn1"].energy > 0;
                if((Spawn1full || (!Spawn1empty && spawnCloserThanSource)) && Memory.spawner.toSpawn == false){
                    common.getEnergyFromSpawn(creep);
                } else {
                    var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
                    if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }

            }
        }


    }
};
module.exports = roleBuilder;


