var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var driller = require('role.driller');
var tower = require('tower');
var spawner = require('spawner');
var common = require('common');

Memory.spawner =   {
    "toSpawn":false,
    "numberCreeps": {harvester:4,driller:2,builder:3,upgrader:3,hauler:0,guardian:1},
	"creepBodys": {
    	harvester:[MOVE,MOVE,CARRY,CARRY,WORK],
		builder:[MOVE,MOVE,CARRY,CARRY,WORK],
		upgrader:[MOVE,MOVE,CARRY,CARRY,WORK],
		guardian:[MOVE,MOVE,ATTACK,ATTACK],
		hauler:[MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],
		driller:[MOVE,MOVE,WORK,WORK]}
};

Memory.rooms = {
	"E43S27":{},
    "E43S26":{}
};

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

    //use spawner
    spawner.run();

    //use creeps
	var countUpgrader = 0;
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		if(creep.memory.role == 'harvester')
		{
		    harvester.run(creep);
		}
		if(creep.memory.role == 'builder')
		{
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
        if(creep.memory.role == 'upgrader')
        {
        	if(countUpgrader < 1)
			{
                //upgrader.run(creep, "E43S26");
                countUpgrader++;
			}
            upgrader.run(creep, "E43S27");
        }
		
		
	}
	
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
    var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_TOWER}}).map(function(element){return element.id});
    //console.log("towers: "+towers);
    Memory.towers = towers;

	var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_CONTAINER}}).map(function(element){return element.id});
	//console.log("containers: "+containers);
	//console.log("cont mem: "+Memory.containers);
	Memory.containers = containers;
}