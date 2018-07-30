
G.aiResources = 0;

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
		player.money = 0;
		player.board = {
			'worker': 6,
			'mech': 4,
			'stars': 6,
			'starsByWar': 2,
			'starsByPower': 1,
			'factoryCard':false
		};

		players.push(player);

		// Choose a Human player to start
		//		if(!player.ai){
		//
		if (player.ai) {
			currentPlayerIndex = players.length - 1;
		} 
	}
});

G.players = function(){
	return players;
};

G.getCurrentPlayer = function(){
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

G.combatBetweenAIs = function(player1,player2){	
	var card1 = getCard(),
		card2 = getCard(),
		sec1 = 0,
		sec2 = 0;

	if(player1.power <= 7){
		sec1 = 0;
	}else if(player1.power >= 14){
		sec1 = 2;
	}else{
		sec1 = 1;
	}
	var power1 = card1.combat.power[sec1];
	power1 = player1.power < power1 ? player1.power : power1;

	if(player2.power <= 7){
		sec2 = 0;
	}else if(player2.power >= 14){
		sec2 = 2;
	}else{
		sec2 = 1;
	}
	var power2 = card2.combat.power[sec2];
	power2 = player2.power < power2 ? player2.power : power2;

	G.getPlayerByFaction(player1.factionName).power -= power1;
	G.getPlayerByFaction(player2.factionName).power -= power2;

	return {
		player1:{
			winner: power1 >= power2,
			reduce: power1
		},
		player2:{
			winner: power1 < power2,
			reduce: power2
		}
	};
};
