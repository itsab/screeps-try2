var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep, roomName) {

        var room = Game.rooms[roomName];

        if(creep.room.name != roomName)
        {
            const route = Game.map.findRoute(creep.room, roomName);
            if(route.length > 0) {
                console.log('Now heading to room '+route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if(creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

    }
};

module.exports = roleClaimer;