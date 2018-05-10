var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var tower = require('tower');
var spawner = require('spawner');
var common = require('common');

Memory.spawner =   {
    "toSpawn":false,
    "numberCreeps": {harvester:4,builder:2,upgrader:2,guardian:2}
};

module.exports.loop = function () {

    //use spawner
    spawner.run();

    //spawn harvesters
    /*var harvesters = _.filter(Game.creeps, (creep) => {return (creep.memory.role == "harvester")});
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    //spawn builders
    var builders = _.filter(Game.creeps, (creep) => {return (creep.memory.role == "builder")});
    if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

	//spawn upgrader
    var upgraders = _.filter(Game.creeps, (creep) => {return (creep.memory.role == "upgrader")});
    if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }*/


    
    //use creeps
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
        if(creep.memory.role == 'upgrader')
        {
            upgrader.run(creep);
        }
		
		
	}
	
	//use towers
	tower.run();
}