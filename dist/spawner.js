var spawner = {
    run: function(){
        var spawnerObj = Memory.spawner;
        var numberCreeps = spawnerObj.numberCreeps;

        //check if there is a creep already waiting to spawn
        if(spawnerObj.toSpawn == false)
        {
            console.log("false");
            //loop through all roles
            for(var key in numberCreeps)
            {
                var numberOfAliveCreeps = _.filter(Game.creeps, (creep) => {return (creep.memory.role == key)});
                if(numberOfAliveCreeps < numberCreeps[key])
                {
                    console.log(numberOfAliveCreeps + "<" + numberCreeps[key]);
                    spawnerObj.toSpawn = true;

                    //creating new creeps name
                    var newName = key + Game.time;


                    //spawning new creep with the role already in memory
                    if(Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,{memory: {role: key}}) == OK){
                        spawnerObj.toSpawn = false;
                        console.log('Spawning new '+ key+ ': ' + newName);
                    };
                }
            }
        } else {

        }
        Memory.spawner = spawnerObj;
    }
}

module.exports = spawner;