var gamestate = {
    run: function(){

	},
	initialize: function() {


    	//empty gamestate
    	var gamestate = {
    		rooms:{
    			//E43S26:{roomType:"main",sources:[]}
    		},
			containers:{

			},
			links:{
                //"5b002c931dd8e17113f51f5b":{direction:"input"},
			}
		}

		//initialize empty gamestate object
		if(_.isNil(Memory.gamestate))
		{
			Memory.gamestate = gamestate;
		}

		//initialize rooms




	},

	addRoom: function(roomName, roomType) {
    	var gamestate = Memory.gamestate;

		if(_.isNil(gamestate.rooms[roomName]))
		{
            gamestate.rooms[roomName] = {roomType: roomType, sources:[]};
		}


    	//add sources to gamestate room obj
		if(_.isObject(Game.rooms[roomName]))
		{
			var sources = Game.rooms[roomName].find(FIND_SOURCES);
			gamestate.rooms[roomName].sources = sources.map( a => a.id);
		}

    	Memory.gamestate = gamestate;
	},

    addLink: function(linkId, direction) {
        var gamestate = Memory.gamestate;

        if(_.isNil(gamestate.links[linkId]))
        {
            gamestate.links[linkId] = {direction: direction};
        }

        Memory.gamestate = gamestate;
    },
}

module.exports = gamestate;