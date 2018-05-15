var roleGuardian = {
    run: function(creep) {

        var roomName = creep.memory.roomName;
        if(creep.pos.roomName != roomName)
        {
            const route = Game.map.findRoute(creep.room, roomName);
            if(route.length > 0) {
                creep.say(route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
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
}
module.exports = roleGuardian;