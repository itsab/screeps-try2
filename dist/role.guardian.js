var roleGuardian = {
    run: function(creep) {

        var roomName = creep.memory.roomName;
        if(roomName != undefined && creep.pos.roomName != roomName)
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
                creep.memory.lastKnownEnemy =  target.pos;
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(creep.memory.lastKnownEnemy)
            {
                var path = creep.room.findPath(creep.pos,creep.memory.lastKnownEnemy);
                var ret = creep.moveByPath(path,{visualizePathStyle: {stroke: '#ffffff'}});
                console.log(ret);
                if(ret == ERR_NO_PATH) {
                    delete creep.memory.lastKnownEnemy;
                }
            }

            var target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            //creep.moveTo(creep.room.controller);
        }



    }
}
module.exports = roleGuardian;