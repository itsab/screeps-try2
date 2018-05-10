var common = {
    getEnergyFromSpawn: function (creep) {
        if (Memory.spawner.toSpawn == false) {
            if (creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            creep.moveTo(Game.spawns.Spawn1,{visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },

    getEnergyFromContainers: function (creep) {
        /*var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: {resourceType: RESOURCE_ENERGY}});
        if(droppedEnergy.length > 0)
        {
            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            console.log(containers);

            if(containers.length > 0)
            {
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }        {*/

        for(var i in Memory.containers)
        {
            var container = Memory.containers[i];
            if(container.store[RESOURCE_ENERGY] / container.storeCapacity > 0.1)
            {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }

        var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}

module.exports = common;