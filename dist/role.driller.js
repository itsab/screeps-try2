var roleDriller = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //mine if already near to energy source
        var source = creep.pos.findInRange(FIND_SOURCES,1)[0];
        if(source){
            creep.harvest(creep.pos.findInRange(FIND_SOURCES,1)[0]);
        } else
        {
            var containersNearSource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER &&
                        structure.pos.findInRange(FIND_SOURCES, 1).length > 0 &&
                        (structure.pos.lookFor(LOOK_CREEPS).length == 0 || structure.pos.lookFor(LOOK_CREEPS)[0].memory.role != "driller");
                }});


            console.log("containers near sources with no creep on it: "+containersNearSource);
            if(containersNearSource)
            {

                if(creep.pos.getRangeTo(containersNearSource) > 1){
                    //move to empty container spot
                    creep.moveTo(containersNearSource, {visualizePathStyle: {stroke: '#ffcc00'}});
                } else {
                    //move to not empty container spot and push creep away
                    var otherCreep = containersNearSource.pos.lookFor(LOOK_CREEPS)[0];

                    //move otherCreep out of the way (direction of room controller)
                    otherCreep.moveTo(otherCreep.room.controller);
                    creep.moveTo(containersNearSource, {visualizePathStyle: {stroke: '#ffcc00'}})
                }



            }
        }


        //search for containers near sources with no creeps on it

   }
}

module.exports = roleDriller;