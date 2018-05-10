var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var upgrader = require('role.upgrader');
var tower = require('tower');
var spawner = require('spawner');
var common = require('common');

Memory.spawner =   {
    "toSpawn":false,
    "numberCreeps": {harvester:4,driller:1,builder:3,upgrader:3,hauler:0,guardian:1},
	"creepBodys": {
    	harvester:[MOVE,MOVE,CARRY,CARRY,WORK],
		builder:[MOVE,MOVE,CARRY,CARRY,WORK],
		upgrader:[MOVE,MOVE,CARRY,CARRY,WORK],
		guardian:[MOVE,MOVE,ATTACK,ATTACK],
		hauler:[MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
		driller:[MOVE,MOVE,WORK,WORK]}
};

Memory.rooms = {
	"E43S27":{},
    "E43S26":{}
};



module.exports.loop = function () {

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


	//DEBUG AREA
	//console.log(Game.cpu.bucket);

    //visuals
    new RoomVisual('E43S27').text("toSpawn: "+Memory.spawner.toSpawn, Game.spawns.Spawn1.pos, {color: 'green', font: 0.8});
}