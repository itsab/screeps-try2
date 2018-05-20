var link = {
    run: function() {

        var links = Memory.gamestate.links;
        var output = _.filter(links,  {direction:"output"}).id;
        console.log("output: "+JSON.stringify(output));

        for(var key in links)
        {
            var direction = Memory.gamestate.links[key].direction;
            var link = Game.getObjectById(key);

            //transfer energy when the link is full and has no cooldown and is input
            if(link.energy == link.energyCapacity && link.cooldown == 0 && direction == "input")
            {
                //find output

            }

        }


    }
}

module.exports = link;