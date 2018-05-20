var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var driller = require('role.driller');
var tower = require('tower');
var link = require('link');
var spawner = require('spawner');
var claimer = require('role.claimer');
var hauler = require('role.hauler');
var common = require('common');
var gamestate = require('gamestate');
var _ = require('lodash');

Memory.spawner =   {
    toSpawn:false,
	creepsT: {
        harvester: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 1, priority:10, maxModifier:2 },
        driller: { body:[MOVE,CARRY,WORK,WORK], buildCount: 2, priority:8, maxModifier:2 },
        builder: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 2, priority:3, maxModifier:3 },
        hauler: { body:[MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], buildCount: 2, priority:6, maxModifier:4 },
        upgrader: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 3, priority:2, maxModifier:3 },
        guard: { body:[MOVE,MOVE,ATTACK,ATTACK], buildCount: 1, priority:4, maxModifier:2 },
		claimer: { body:[MOVE,CLAIM], buildCount: 0, priority:1, maxModifier:2 }
    },
    //spawnQueue: []
};

if(Memory.spawner.spawnQueue == undefined || Memory.spawner.spawnQueue == null){
    Memory.spawner.spawnQueue = [];
}

Memory.rooms = {
	"E43S27":{},
    "E43S26":{}
};

var haulTask1 = {name:"task1",type:"haul",resource:RESOURCE_ENERGY,from:"5afb1b8ab3e64025b23eedfb",to:"5af6fda89f8ba0792ba7cc19"}; //top room -> storage
var haulTask2 = {name:"task2",type:"haul",resource:RESOURCE_ENERGY,from:"5af9fcd95a3dc50ab931abe3",to:"5af6fda89f8ba0792ba7cc19"};
var haulTask3 = {name:"task3",type:"haul",resource:RESOURCE_ENERGY,from:"5af9f49795f0fd2d0929dbd9",to:"5af6fda89f8ba0792ba7cc19"};
var haulTask4 = {name:"task4",type:"haul",resource:RESOURCE_ENERGY,from:"5af6fda89f8ba0792ba7cc19",to:"5af762cf8c13c16cef3e01fd"};
var haulTask5 = {name:"task5",type:"haul",resource:RESOURCE_ENERGY,from:"5afb2ec94430756b38a4c7cb",to:"5af6fda89f8ba0792ba7cc19"}; //top room -> storage
var haulTask6 = {name:"task6",type:"haul",resource:RESOURCE_ENERGY,from:"5af6fda89f8ba0792ba7cc19",to:"5b018476ad1a1e78d5076dd9"}; //storage -> upgrade
//Game.spawns["Spawn1"].spawnCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],"haulerManual",{memory:{role:"hauler",task:{name:"task4",type:"haul",resource:RESOURCE_ENERGY,from:"5af6fda89f8ba0792ba7cc19",to:"5af762cf8c13c16cef3e01fd"}}});


Memory.containers = ["5af4a6b43d614859f1ed8175"];

module.exports.loop = function () {

    //gamestate stuff
    gamestate.initialize();
    gamestate.addRoom("E43S27", "main");
    gamestate.addLink("5b002c931dd8e17113f51f5b", "output");
    gamestate.addLink("5b00461930133270e9f34481", "input");
    gamestate.addContainer("5b018476ad1a1e78d5076dd9","output");
    gamestate.addContainer("5af9fcd95a3dc50ab931abe3","input");
    gamestate.addContainer("5af9f49795f0fd2d0929dbd9","input");
    gamestate.addStorage("5af6fda89f8ba0792ba7cc19");


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


    //current creep count
    if(_.isEmpty(Game.creeps))
    {
        spawner.emergencyRecovery();
    }

    //use creeps
	var countUpgrader = 0;
	var countBuilder = 0;
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		if(creep.memory.role == 'harvester')
		{
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
				claimer.reserve(creep);
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

	//use links
    link.run();

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