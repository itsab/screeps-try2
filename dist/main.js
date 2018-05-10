var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var tower = require('tower');
var spawner = require('spawner');
var common = require('common');

Memory.spawner =   {
    "toSpawn":false,
    "numberCreeps": {harvester:4,driller:0,builder:2,upgrader:2,hauler:0,guardian:1},
	"creepBodys": {
    	harvester:[MOVE,MOVE,CARRY,CARRY,WORK],
		builder:[MOVE,MOVE,CARRY,CARRY,WORK],
		upgrader:[MOVE,MOVE,CARRY,CARRY,WORK],
		guardian:[MOVE,MOVE,ATTACK,ATTACK],
		hauler:[MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
		driller:[MOVE,MOVE,WORK,WORK]}
};

module.exports.loop = function () {

    //use spawner
    spawner.run();

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