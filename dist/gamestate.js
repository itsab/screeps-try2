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
			},
			storages: {

			}
		}

		//initialize empty gamestate object
		if(Memory.gamestate == undefined)
		{
			console.log("initializing gamestate");
			Memory.gamestate = gamestate;
		} else if(Memory.gamestate.links == undefined)
		{
			Memory.gamestate.links = {}
		} else if(Memory.gamestate.rooms == undefined)
        {
            Memory.gamestate.rooms = {}
        }else if(Memory.gamestate.containers == undefined)
        {
            Memory.gamestate.containers = {}
        }else if(Memory.gamestate.storages == undefined)
        {
            Memory.gamestate.storages = {}
        }


		//initialize rooms




	},

	addRoom: function(roomName, roomType) {
    	var gamestate = Memory.gamestate;

		if(gamestate.rooms[roomName] == undefined)
		{
            gamestate.rooms[roomName] = {roomType: roomType, sources:[], id:roomName};
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

        if(gamestate.links[linkId] == undefined)
        {
            gamestate.links[linkId] = {direction: direction, id: linkId};
        }

        Memory.gamestate = gamestate;
    },

    addContainer: function(containerId, containerType) {
        var gamestate = Memory.gamestate;

        if(gamestate.containers[containerId] == undefined)
        {
            gamestate.containers[containerId] = {direction: containerType, id: containerId};
        }

        Memory.gamestate = gamestate;
    },
    addStorage: function(storageId) {
        var gamestate = Memory.gamestate;

        if(gamestate.storages[storageId] == undefined)
        {
            gamestate.storages[storageId] = {id: storageId};
        }

        Memory.gamestate = gamestate;
    },
}

module.exports = gamestate;