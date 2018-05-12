var spawner = {
    run: function(){
        //private functions
        var extendBody = function(currentBody) {
            var extendedBody = [];
            var currentBodyCost = bodyCost(currentBody);
            var baseCapacity = currentBodyCost;
            var availableEnergy = Game.spawns.Spawn1.room.energyCapacityAvailable;
            var k = parseInt(availableEnergy / baseCapacity);

            for(var i = 0; i<k; i++)
            {
                extendedBody = extendedBody.concat(currentBody);
            }

            return extendedBody;
        }

        function bodyCost (body) {
            return body.reduce(function (cost, part) {
                return cost + BODYPART_COST[part];
            }, 0);
        }

        //start
        var spawnerObj = Memory.spawner;
        var creepsT = spawnerObj.creepsT;

        //check if there is a creep already spawning
        if(Game.spawns.Spawn1.spawning != null)
        {
            return;
        }

        //check if there is something in the spawn queue
        if(Memory.spawner.queue.length > 0)
        {

        }


        //loop through all roles
        for(var key in creepsT)
        {

            var numberOfAliveCreeps = _.filter(Game.creeps, (creep) => {return (creep.memory.role == key)}).length;

            //console.log(key + ": " + numberOfAliveCreeps);
            if(numberOfAliveCreeps < creepsT[key].buildCount)
            {
                console.log(numberOfAliveCreeps + "<" + creepsT[key].buildCount + " - not enough "+ key + "s");
                spawnerObj.toSpawn = true;

                //creating new creeps name
                var newName = key + Game.time;

                //combine new creep body
                var basicBody = spawnerObj.creepsT[key].body;
                var extendedBody = extendBody(basicBody);

                //console.log(key + ": trying to spawn - extendedBody: " + extendedBody +" - "+bodyCost(extendedBody));

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
    },

    //add dead creeps back to spawn queue
    //https://github.com/avdg/screeps/blob/e98cf551ec3393c2c165d9a465851ee843694d2e/scripts/unit_deathChecker.js
    deathChecker: function(){

        for (var i in Memory.creeps) {

            if (Game.creeps[i]) {
                continue; // Ignore when creep is found alive
            }

            //if (settings.deathChecker.ignore.indexOf(Memory.creeps[i].role) !== -1 ||
             //   ("copyOnDeath" in Memory.creeps[i] && Memory.creeps[i].copyOnDeath === false)
            //) {
                console.log('Unit deathChecker: Found dead creep ' + i + '. Deleting...');
                removeQueue.push(i);
            //} else if (settings.deathChecker.copy.indexOf(Memory.creeps[i].role) !== -1) {
                console.log('Unit deathChecker: Found dead creep ' + i + '. Copying...');
                utils.exec('creepClone', {
                    /* Fake creep object*/
                    role: Memory.creeps[i].role,
                    memory: Memory.creeps[i]
                }, true);
                removeQueue.push(i);
            //} else {
            //    console.log('Unit deathChecker: Found dead creep ' + i + '. Dunno what to do...');
        }
    }
}

module.exports = spawner;