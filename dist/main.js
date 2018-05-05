var harvester = require('role.harvester');
var builder = require('role.builder');
var guardian = require('role.guardian');
var tower = require('tower');

module.exports.loop = function () {



    var harvesters = _.filter(Game.creeps, (creep) => {return (creep.memory.role == "harvester")})

    //spawn harvesters
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    
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
		
		
	}
	
	//use towers
	tower.run();
}