var common = {
    getEnergyFromStorage: function (creep) {
        if(Memory.storages[0] != undefined){
            var storage = Game.getObjectById(Memory.storages[0]);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffaa00'}});
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


        var energyContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] > 0;
            }
        });

        //find closest dropped energy in range
        var dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES,{filter:{}});
        if(dropped.length > 0) {
            var energy = creep.pos.findClosestByPath(dropped);
            if(creep.pickup(energy,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy);
            }
        } else if(energyContainers.length > 0)  //get energy from containers
        {

            //sort energyContainers by amount / (range/3)
            energyContainers.sort(sortContainers);
            var energyContainer = energyContainers[0];

            //get energy from chosen container
            if(creep.withdraw(energyContainer,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energyContainer);
            }

        } else { // go mine nearest source

            var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
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
                    if(creep.withdraw(from, task.resource) == OK) {
                        creep.memory.hauling = true;
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

    getEnergyFromContainers: function (creep) {
        var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {filter: {resourceType: RESOURCE_ENERGY}});
        if(droppedEnergy.length > 0)
        {
            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else
        {
            var containers = Memory.containers.map(Game.getObjectById);
            if(containers.length > 0) {
                var container = creep.pos.findClosestByPath(containers, {
                    filter: (structure) => {
                        return structure.store[RESOURCE_ENERGY] > 500;
                    }
                });
            }


            if(container)
            {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                var nearSource = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(nearSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }



        /*
        for(var i in Memory.containers)
        {
            var container = Game.getObjectById(Memory.containers[i]);
            if(container.store[RESOURCE_ENERGY] > 200)
            {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }*/


    }
}

module.exports = common;