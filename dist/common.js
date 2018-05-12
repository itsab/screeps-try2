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

    getEnergyFromStorage: function (creep) {
        if(Memory.storages[0] != undefined){
            var storage = Game.getObjectById(Memory.storages[0]);
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    },
    getEnergy: function(creep) {
      //TODO get energy from storage -> container -> source
      //cost = totalEnergy / Range ( * modifier?)
      //the bigger the better


    },

    runTask: function (creep, task) {
        switch(task.type) {
            case "haul":
                var from = Game.getObjectById(task.from);
                var to = Game.getObjectById(task.to);

                if(creep.memory.hauling == undefined)
                {
                    creep.memory.hauling = false;
                }

                if(creep.memory.hauling == false)
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