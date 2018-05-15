var roleGuardian = {
    run: function(creep) {
    	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    	var target = creep.pos.findClosestByPath(targets);
    	if(target) {
    		if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
    			creep.moveTo(targets[0]);		
    		}
    	}

        var target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if(target) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }
}
module.exports = roleGuardian;