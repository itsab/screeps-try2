var common = require('common');

var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var task = creep.memory.task;
        if(task != undefined)
        {
            if(common.runTask(creep,task) == ERR_NOT_ENOUGH_RESOURCES){
                //console.log("debug if");
                var ret = common.getEnergyFromFloor(creep,10);
                if(ret==ERR_FULL)
                {
                    creep.memory.hauling = true;
                }
            }
        } else {
            creep.say("no task");
        }

	}
};

module.exports = roleHauler;

//task:{type:"haul",resource:RESOURCE_ENERGY,from:"",to:""}