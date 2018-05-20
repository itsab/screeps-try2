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

            //tranfser energy to link in range
            var link = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}})
            if(creep.carry.energy > 0 && link != undefined && creep.pos.getRangeTo(link) < 2)
            {
                creep.transfer(link, RESOURCE_ENERGY);
            }

            //check if standing on container -> mine
            var structures = creep.pos.lookFor(LOOK_STRUCTURES);
            if(structures.length > 0 && structures[0].structureType == STRUCTURE_CONTAINER)
            {

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
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                var ret = creep.harvest(source, RESOURCE_ENERGY);
                if( ret == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                } else if (ret == ERR_NOT_ENOUGH_RESOURCES) {
                    var cont = creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:{structureType:STRUCTURE_CONTAINER}});
                    creep.transfer(cont, RESOURCE_ENERGY);
                }
            }

        }


        //search for containers near sources with no creeps on it

   }
}

module.exports = roleDriller;