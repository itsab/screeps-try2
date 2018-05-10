var roleDriller = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //mine if already near to energy source
        var source = creep.pos.findInRange(FIND_SOURCES,1)[0];
        if(source) creep.harvest(creep.pos.findInRange(FIND_SOURCES,1)[0]);

        //search for containers near sources with no creeps on it
        var containersNearSource = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    (structure.pos.findInRange(FIND_SOURCES,1).length > 0) &&
                    structure.pos.lookFor(FIND_CREEPS).length == 0)
            }});


        console.log("containers near sources with no creep on it: "+containersNearSource);
        if(containersNearSource.length > 0)
        {
            creep.moveTo(containersNearSource[0], {visualizePathStyle: {stroke: '#ffcc00'}});
        }
   }
}

module.exports = roleDriller;