var spawner = {
    run: function(){
        //private functions
        var extendBody = function(currentBody) {
            var extendedBody = [];
            var baseCapacity = 300;
            var availableEnergy = Game.spawns.Spawn1.room.energyAvailable;
            var k = parseInt(availableEnergy / baseCapacity);

            for(var i = 0; i<k; i++)
            {
                extendedBody.concat(currentBody);
            }

            return extendedBody;
        }



        //start
        var spawnerObj = Memory.spawner;
        var numberCreeps = spawnerObj.numberCreeps;

        //check if there is a creep already waiting to spawn

        //loop through all roles
        for(var key in numberCreeps)
        {
            //DEBUG START
            //combine new creep body
            var basicBody = spawnerObj.creepBodys[key];
            var extendedBody = extendBody(basicBody);
            console.log("basic"+basicBody);
            console.log("extended"+extendedBody);
            //DEBUG END

            var numberOfAliveCreeps = _.filter(Game.creeps, (creep) => {return (creep.memory.role == key)});
            if(numberOfAliveCreeps.length < numberCreeps[key])
            {
                console.log(numberOfAliveCreeps.length + "<" + numberCreeps[key] + " - not enough "+ key + "s");
                spawnerObj.toSpawn = true;

                //creating new creeps name
                var newName = key + Game.time;

                //combine new creep body
                var basicBody = spawnerObj.creepBodys[key];
                var extendedBody = extendBody(basicBody);

                console.log("basic"+basicBody);
                console.log("extended"+extendedBody);

                //spawning new creep with the role already in memory
                if(Game.spawns['Spawn1'].spawnCreep(spawnerObj.creepBodys[key], newName,{memory: {role: key}}) == OK){
                    spawnerObj.toSpawn = false;
                    console.log('Spawning new '+ key+ ': ' + newName);
                };

                //exit spawner loop
                break;
            }
        }

        Memory.spawner = spawnerObj;
    }
}

module.exports = spawner;