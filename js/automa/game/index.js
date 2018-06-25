//@prepros-prepend config.js
//@prepros-prepend deck.js
//@prepros-prepend automa.js



/* GAME API ********************/

var GAME = (function() {

	var G = {};

	var players = null,
		currentPlayerIndex = -1;

	G.newGame = function(playerOptions) {
		players = [];
		currentPlayerIndex = -1;

		playerOptions.forEach(function(playerName,k) {
			if (playerName !== 'none') {
				var newPlayer = AUTOMA.createPlayer(playerName,k);
				players.push(newPlayer);
			}
		});
		players.forEach(function(player,k){
			if(currentPlayerIndex === -1 && !player.ai){
				currentPlayerIndex = k;
			}
		});
	};

	G.getPlayer = function(){
		return players;
	};

	G.getCurrentPlayer = function(){
		return players[currentPlayerIndex];
	};

	G.advanceCurrentPlayer = function(){
		currentPlayerIndex++;
		if(currentPlayerIndex >= players.length){
			currentPlayerIndex = 0;
		}
		return players[currentPlayerIndex];
	};



	return G;
})();