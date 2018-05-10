var common = {
    getEnergyFromSpawn: function (creep) {
        if (Memory.spawner.toSpawn == false) {
            if (creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        } else {
            creep.moveTo(Game.spawns.Spawn1);
        }
    }
}

module.exports = common;