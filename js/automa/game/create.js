

// Create Players
var players = [],
	currentPlayerIndex = -1;

factionToCreate.forEach(function(facInd, i){
	if(facInd > 0){
		var player = cloneObject(GAMECONFIG.playerTypes[facInd]),
			faction = GAMECONFIG.factions[i];

		player.factionName = faction.name;
		player.power = faction.power;
		player.cards = faction.cards;
		player.board = {
			'worker': 6,
			'mech': 4
		};

		players.push(player);

		// Choose a Human player to start
		if(!player.ai){
			currentPlayerIndex = players.length - 1;
		} 
	}
});

G.currentPlayer = function(){
	return players[currentPlayerIndex];
};
G.advancePlayer = function(){
	currentPlayerIndex = currentPlayerIndex >= (players.length - 1) ? 0 : currentPlayerIndex + 1;
};

G.getPlayerByFaction = function(faction){
	var pl = null;
	players.forEach(function(p){
		if(p.factionName === faction){
			pl = p;
		}
	});
	return pl;
};
