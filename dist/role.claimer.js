var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep, roomName) {
        console.log("roomName: "+roomName);
        console.log("creepRoom: "+creep.pos.roomName);
        if(creep.pos.roomName != roomName)
        {
            const route = Game.map.findRoute(creep.room, roomName);
            if(route.length > 0) {
                creep.say('Now heading to room '+route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            console.log("else");
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

    }
};

module.exports = roleClaimer;