

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

	// log('---------------------');
	// log('player1.power',player1.power);
	// log('card1',card1);
	// log('power1',power1);
	// log('-');
	// log('player2.power',player2.power);
	// log('card2',card2);
	// log('power2',power2);
	// log('---------------------');

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
