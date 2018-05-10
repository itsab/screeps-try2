var roleDriller = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //search for containers near sources with no creeps on it
        var containersNearSource = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.pos.findInRange(FIND_SOURCES,1).length > 0)
            }});


        console.log("containers near sources with no creep on it: "+containersNearSource);
        if(containersNearSource.length > 0)
        {
            if(creep.harvest(containersNearSource[0].pos.findInRange(FIND_SOURCES,1)[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containersNearSource[0], {visualizePathStyle: {stroke: '#ffcc00'}});
            }
        }
   }
}

module.exports = roleDriller;