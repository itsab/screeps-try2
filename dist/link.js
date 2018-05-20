var link = {
    run: function() {

        var links = Memory.gamestate.links;

        for(var key in links)
        {
            var direction = Memory.gamestate.links[key].direction;
            var link = Game.getObjectById(key);

            //transfer energy when the link is full and has no cooldown and is input
            if(link.energy == link.energyCapacity && link.cooldown == 0 && linkType == "input")
            {
                //find output

            }

        }


    }
}

module.exports = link;