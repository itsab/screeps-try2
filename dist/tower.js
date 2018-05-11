var tower = {
    run: function() {
        var towers = Memory.towers.map(Game.getObjectById);

        for(var key in towers)
        {
            var tower = towers[key];
            //attack
            //TODO attack logic (range restricted)
            var towerRange = 15;
            var attackThreshold = 10;
            var enemies = tower.room.findInRange(FIND_HOSTILE_CREEPS,towerRange);
            if(enemies.length > 0 && Memory.underAttack > attackThreshold)
            {
                var enemy = tower.pos.findClosestByRange(enemies);
                tower.attack(enemy);
            }

            //repair structures
            if(tower.energy / tower.energyCapacity > 0.5)
            {
                var repairTargets = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => { var calc = structure.hits / structure.hitsMax; return calc < 0.7; }
                });

                if(repairTargets.length > 0) {
                    var repairTarget = tower.pos.findClosestByRange(repairTargets);
                    if(tower.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                        tower.moveTo(repairTarget);
                    }
                }
            }

        }


    }
}

module.exports = tower;