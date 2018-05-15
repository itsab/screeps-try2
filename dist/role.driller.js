var roleDriller = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //change room according to creep.memory.roomName
        if(creep.pos.roomName != creep.memory.roomName && creep.memory.roomName != undefined)
        {
            const route = Game.map.findRoute(creep.room, creep.memory.roomName);
            if(route.length > 0) {
                creep.say(route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {

            //check if standing on container -> mine
            if(creep.pos.lookFor(LOOK_STRUCTURES,{filter:{structureType:STRUCTURE_CONTAINER}}).length > 0)
            {
                console.log("lookFOr");
                var source = creep.pos.findInRange(FIND_SOURCES,1)[0];
                if(source){
                    creep.harvest(creep.pos.findInRange(FIND_SOURCES,1)[0]);
                    return;
                }
            }

            var containers = Memory.containers.map(Game.getObjectById);
            if(containers.length > 0)
            {
                var containersNearSource = creep.pos.findClosestByPath(containers, {
                    filter: (structure) => {
                        return structure != null && structure.structureType == STRUCTURE_CONTAINER &&
                            structure.pos.findInRange(FIND_SOURCES, 1).length > 0 &&
                            (structure.pos.lookFor(LOOK_CREEPS).length == 0 || structure.pos.lookFor(LOOK_CREEPS)[0].memory.role != "driller");
                    }});


                //console.log("containers near sources with no creep on it: "+containersNearSource);
                if(containersNearSource)
                {
                    //console.log("range to container: "+creep.pos.getRangeTo(containersNearSource));
                    if(creep.pos.getRangeTo(containersNearSource) > 1){
                        //move to empty container spot
                        creep.moveTo(containersNearSource, {visualizePathStyle: {stroke: '#ffcc00'}});
                    } else if(creep.pos.getRangeTo(containersNearSource) > 0){
                        //move to not empty container spot and push creep away
                        var otherCreep = containersNearSource.pos.lookFor(LOOK_CREEPS)[0];

                        //move otherCreep out of the way (direction of room controller)
                        if(otherCreep && creep.pos.getRangeTo(containersNearSource) < 2)
                        {
                            otherCreep.moveTo(otherCreep.room.controller);
                        }

                        creep.moveTo(containersNearSource, {visualizePathStyle: {stroke: '#ffcc00'}})
                    }

                }
            } else{
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

        }


        //search for containers near sources with no creeps on it

   }
}

module.exports = roleDriller;