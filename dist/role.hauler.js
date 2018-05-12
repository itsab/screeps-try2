var common = require('common');

var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var task = creep.memory.task;
        console.log("hauler running");
        if(task != undefined)
        {
            console.log("task defined");
            common.runTask(creep,task);
        } else {
            creep.say("no task");
        }

	}
};

module.exports = roleHauler;

//task:{type:"haul",resource:RESOURCE_ENERGY,from:"",to:""}