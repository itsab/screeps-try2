var tower = {
    run: function() {
        var towers = Memory.towers.map(Game.getObjectById);

        for(var key in towers)
        {
            var tower = towers[key];
            //attack
            //TODO attack logic (range restricted)
            var towerRange = 300;
            var attackThreshold = 0;
            var enemies = tower.pos.findInRange(FIND_HOSTILE_CREEPS,towerRange);
            if(enemies.length > 0 && Memory.underAttack > attackThreshold)
            {
                var enemy = tower.pos.findClosestByRange(enemies);
                tower.attack(enemy);
            }

            //repair structures
            if(tower.energy / tower.energyCapacity > 0.5)
            {
                var repairTargets = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        var ret;
                        var calc = structure.hits / structure.hitsMax;
                        if(structure.type != STRUCTURE_WALL && structure.type != STRUCTURE_RAMPART)
                        {
                            ret = calc < 0.7
                            console.log("0.7");
                        } else {
                            console.log("0.0001");
                            ret = calc < 0.001;
                        }
                        return ret;}
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