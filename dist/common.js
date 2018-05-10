var common = {
    getEnergyFromSpawn: function(creep) {
    if(Memory.spawer.toSpawn == false)
    {
        if(creep.withdraw(creep.room.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1);
        }
    }
};

}
module.exports = common;