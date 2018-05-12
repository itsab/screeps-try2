var common = require('common');

var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var task = creep.memory.task;
        if(task != undefined)
        {
            common.runTask(creep,task);
        }

	}
};

module.exports = roleHauler;

//task:{type:"haul",resource:RESOURCE_ENERGY,from:"",to:""}