var common = {
    getEnergyFromSpawn: function (creep) {
        if (Memory.spawner.toSpawn == false) {
            if (creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1,{visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            creep.moveTo(Game.spawns.Spawn1,{visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}

module.exports = common;