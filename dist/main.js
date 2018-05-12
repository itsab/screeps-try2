var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var driller = require('role.driller');
var tower = require('tower');
var spawner = require('spawner');
var claimer = require('role.claimer');
var common = require('common');

Memory.spawner =   {
    toSpawn:false,
	creepsT: {
        harvester: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 4, priority:1 },
        driller: { body:[MOVE,MOVE,WORK,WORK], buildCount: 2, priority:1 },
        builder: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 3, priority:1 },
        hauler: { body:[MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], buildCount: 0, priority:1 },
        upgrader: { body:[MOVE,MOVE,CARRY,CARRY,WORK], buildCount: 3, priority:1 },
        guardian: { body:[MOVE,MOVE,ATTACK,ATTACK], buildCount: 1, priority:1 },
		claimer: { body:[MOVE,MOVE,CLAIM], buildCount: 0, priority:1 }
    }
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
                creep.memory.roomName = "E43S26";
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
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
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