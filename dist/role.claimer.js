var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep, roomName) {

        var room = Game.rooms[roomName];

        if(creep.room != room)
        {
            creep.moveTo(room,{visualizePathStyle: {stroke: '#ffffff'});
        }
        if(creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    }

};

module.exports = roleClaimer;