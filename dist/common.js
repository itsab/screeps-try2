var common = {
    getEnergyFromStorage: function (creep) {
        if(Memory.storages[0] != undefined){
            var storage = Game.getObjectById(Memory.storages[0]);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    },
    getEnergyFromFloor: function (creep,range) {

        var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES, range, {filter: {resourceType: RESOURCE_ENERGY}});
        if (dropped.length > 0) {
            //console.log("DEBUG:dropped");
            var energy = creep.pos.findClosestByPath(dropped);
            var ret = creep.pickup(energy, RESOURCE_ENERGY);
            if (ret == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy);
            } else {
                return ret;
            }
        }
    },
    getEnergy: function(creep) {

        var sortContainers = function(a, b)
        {
            var ar = a.store[RESOURCE_ENERGY] / (creep.pos.getRangeTo(a) / 3);
            var br = b.store[RESOURCE_ENERGY] / (creep.pos.getRangeTo(b) / 3);

            if(ar == br)
                return 0;

            return (ar < br ? 1 : -1);
        }

        if(this.getEnergyFromFloor(creep,20) != OK) {

            var energyContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (energyContainers.length > 0)  //get energy from containers
            {
                //console.log("DEBUG containers: "+energyContainers);
                //sort energyContainers by amount / (range/3)
                energyContainers.sort(sortContainers);
                var energyContainer = energyContainers[0];

                //get energy from chosen container
                if (creep.withdraw(energyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyContainer);
                }

            } else { // go mine nearest source

                var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
        }
    },

    runTask: function (creep, task) {
        switch(task.type) {
            case "haul":
                var from = Game.getObjectById(task.from);
                var to = Game.getObjectById(task.to);
                creep.say(task.name);

                if(creep.memory.hauling == undefined)
                {
                    creep.memory.hauling = false;
                }

                if(creep.memory.hauling == false || creep.carry.energy == 0)
                {
                    var ret = creep.withdraw(from, task.resource);
                    if(ret == OK || ret == ERR_FULL) {
                        creep.memory.hauling = true;
                    } else if(ret == ERR_NOT_ENOUGH_RESOURCES) {
                        return ret;
                    } else {
                        //console.log("moveTo");
                        creep.moveTo(from, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    if(creep.transfer(to, task.resource) == OK) {
                        creep.memory.hauling = false;
                    } else {
                        creep.moveTo(to, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                break;
            case "build":
                //TODO build task
                break;
        }
    },

    log: function(logText) {
        console.log("<span style='color:blue'>h1test: "+logText+"</span>");
        console.log(log.caller);
    }

}

module.exports = common;