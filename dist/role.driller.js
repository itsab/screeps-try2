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
                var asd;
                if(asd){

                }
                //move to empty container spot
                creep.moveTo(containersNearSource, {visualizePathStyle: {stroke: '#ffcc00'}})

                //move to not empty container spot and push creep away
            }
        }


        //search for containers near sources with no creeps on it

   }
}

module.exports = roleDriller;