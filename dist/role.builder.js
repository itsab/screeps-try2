var common = require('common');

var roleBuilder = {
	run: function(creep) {
        if(creep.carry.energy == 0) {
            common.getEnergyFromSpawn(creep);
        }
        else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};
module.exports = roleBuilder;