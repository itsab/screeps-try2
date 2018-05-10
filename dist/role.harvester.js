var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        /*var sources = creep.room.find(FIND_SOURCES);

             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }*/

	        //pickup dropped energy in range
            var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: {resourceType: RESOURCE_ENERGY}});
	        if(droppedEnergy.length > 0)
            {
                if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

            var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;