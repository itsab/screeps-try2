var spawner = {
    run: function(){
        //private functions
        var extendBody = function(currentBody) {
            var extendedBody = [];
            var baseCapacity = 300;
            var availableEnergy = Game.spawns.Spawn1.room.energyCapacityAvailable;
            var k = parseInt(availableEnergy / baseCapacity);

            for(var i = 0; i<k; i++)
            {
                extendedBody = extendedBody.concat(currentBody);
            }

            return extendedBody;
        }



        //start
        var spawnerObj = Memory.spawner;
        var creepsT = spawnerObj.creepsT;

        //check if there is a creep already spawning
        if(Game.spawns.Spawn1.spawning != null)
        {
            return;
        }

        //loop through all roles
        for(var key in creepsT)
        {

            var numberOfAliveCreeps = _.filter(Game.creeps, (creep) => {return (creep.memory.role == key)}).length;

            if(numberOfAliveCreeps < creepsT[key])
            {
                console.log(numberOfAliveCreeps.length + "<" + creepsT[key] + " - not enough "+ key + "s");
                spawnerObj.toSpawn = true;

                //creating new creeps name
                var newName = key + Game.time;

                //combine new creep body
                var basicBody = spawnerObj.creepsT[key].body;
                var extendedBody = extendBody(basicBody);

                //spawning new creep with the role already in memory
                if(Game.spawns['Spawn1'].spawnCreep(extendedBody, newName,{memory: {role: key}}) == OK){
                    spawnerObj.toSpawn = false;
                    console.log('Spawning new '+ key+ ': ' + newName);
                    console.log('Body: '+extendedBody);
                };

                //exit spawner loop
                break;
            }
        }

        Memory.spawner = spawnerObj;
    }
}

module.exports = spawner;