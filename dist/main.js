var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var driller = require('role.driller');
var tower = require('tower');
var spawner = require('spawner');
var claimer = require('role.claimer');
var hauler = require('role.hauler');
var common = require('common');

Memory.spawner =   {
    toSpawn:false,
	creepsT: {
        harvester: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 2, priority:1 },
        driller: { body:[MOVE,MOVE,WORK,WORK], buildCount: 3, priority:1 },
        builder: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 3, priority:1 },
        hauler: { body:[MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], buildCount: 5, priority:1 },
        upgrader: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 3, priority:1 },
        guardian: { body:[MOVE,MOVE,ATTACK,ATTACK], buildCount: 1, priority:1 },
		claimer: { body:[MOVE,MOVE,CLAIM], buildCount: 0, priority:1 }
    },
    spawnQueue: []
};

Memory.rooms = {
	"E43S27":{},
    "E43S26":{}
};

var haulTask1 = {name:"task1",type:"haul",resource:RESOURCE_ENERGY,from:"5af4a6b43d614859f1ed8175",to:"5af6fda89f8ba0792ba7cc19"};
var haulTask2 = {name:"task2",type:"haul",resource:RESOURCE_ENERGY,from:"5af6de994504820382dd6426",to:"5af6fda89f8ba0792ba7cc19"};
var haulTask3 = {name:"task3",type:"haul",resource:RESOURCE_ENERGY,from:"5af5c51be3494c6b2c9bdcaa",to:"5af6fda89f8ba0792ba7cc19"};
var haulTask4 = {name:"task4",type:"haul",resource:RESOURCE_ENERGY,from:"5af4a6b43d614859f1ed8175",to:"5af762cf8c13c16cef3e01fd"};



Memory.containers = ["5af4a6b43d614859f1ed8175"];

module.exports.loop = function () {

	//check if main-room is under attack (enemy inside longer than 10 ticks)
	if(Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS).length > 0)
	{
		Memory.underAttack++;
		if(Memory.underAttack > 100) {
			console.log("ALERT: WOULD ACTIVATE SAFEMODE NOW");
			//Game.spawns.Spawn1.room.controller.activateSafeMode();
		}
    } else {
		Memory.underAttack = 0;
	}



    //use creeps
	var countUpgrader = 0;
	var countBuilder = 0;
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		if(creep.memory.role == 'harvester')
		{
		    console.log("harvester: "+creep);
		    harvester.run(creep);
		}
		if(creep.memory.role == 'builder')
		{
            if(countBuilder < 1)
            {
                //creep.memory.roomName = "E43S26";
                //builder.run(creep, "E43S26");
                countBuilder++;
            }
		    builder.run(creep);
		}
		if(creep.memory.role == 'guard')
        {
            guardian.run(creep);
        }
        if(creep.memory.role == 'driller')
        {
            driller.run(creep);
        }
        if(creep.memory.role == 'hauler')
        {
            hauler.run(creep);
        }
        if(creep.memory.role == 'upgrader')
        {
        	if(countUpgrader < 1)
			{
                //upgrader.run(creep, "E43S26");
                //creep.memory.roomName = "E43S26";
                countUpgrader++;
			}
            upgrader.run(creep, "E43S27");
        }
        if(creep.memory.role == 'claimer')
        {
			for(var roomName in Memory.rooms)
			{
				claimer.run(creep,"E43S26");
			}

        }
		
	}

	//clear dead creeps from memory
    spawner.deathChecker();
    /*for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }*/

    //use spawner
    spawner.run();

	//use towers
	tower.run();

	//run every10ticks
	if(Game.time % 10 == 0)
	{
        every10ticks();
	}



	//DEBUG AREA
	//console.log(Game.cpu.bucket);

    //visuals
    new RoomVisual('E43S27').text("toSpawn: "+Memory.spawner.toSpawn, Game.spawns.Spawn1.pos, {color: 'green', font: 0.8});
}

var every10ticks = function() {

    var towers_ = [];
    var containers_ = [];
    var storages_ = [];


    for(var roomName in Game.rooms)
    {
        var room = Game.rooms[roomName];
        //console.log(room);
        //console.log(JSON.stringify(room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_CONTAINER}}).map(function(element){return element.id})));

        towers_ = towers_.concat(room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_TOWER}}).map(function(element){return element.id}));
        containers_ = containers_.concat(room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_CONTAINER}}).map(function(element){return element.id}));
        storages_ = storages_.concat(room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_STORAGE}}).map(function(element){return element.id}));

    }

    //var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_TOWER}}).map(function(element){return element.id});
    //console.log("towers: "+towers_);
    Memory.towers = towers_;

	//var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_CONTAINER}}).map(function(element){return element.id});
	//console.log("containers: "+containers_);
	//console.log("cont mem: "+Memory.containers);
	Memory.containers = containers_;

	Memory.storages = storages_;

	//set driller counter according to containers (output/storage containers produce too many drillers)
	//Memory.spawner.creepsT.driller.buildCount = containers_.length;
}