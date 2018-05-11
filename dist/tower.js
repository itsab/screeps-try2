var tower = {
    run: function(){
        //attack


        //repair structures
        var repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => { var calc = structure.hits / structure.hitsMax; return calc < 0.5; }
        });

        if(repairTargets.length > 0) {
            var repairTarget = creep.pos.findClosestByPath(repairTargets);
            if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairTarget);
            }
        }
    }
}

module.exports = tower;