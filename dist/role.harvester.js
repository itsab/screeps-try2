var common = require('common');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
            creep.say('collecting');
        }
        if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }

        if(creep.memory.harvesting) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            //console.log(target);
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
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
            common.getEnergyFromContainers(creep);
        }
    }
};

module.exports = roleHarvester;