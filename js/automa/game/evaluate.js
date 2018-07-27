G.evaluateAI = function (player) {
	//	log('player', player);

	var card = getCard();

	var moves = card['e' + player.strategy].move;

	var moveChoice = null;

	moves.forEach(function (m) {		
		if (!moveChoice) {
			var validFaction = m.faction ? m.faction === player.factionName : true;

			var canAttack = true;

			if(m.attack && m.attack !== 'worker'){
				if(m.attack > player.power){
					canAttack = false;
				}
			}

			if (validFaction && canAttack) {
				moveChoice = AUTOMA.move(m,player);				
			}
		}		
	});

	log('moveChoice', moveChoice);

	// var vecs = getVecs(player);
	// log('vecs', vecs);
	// Evaluate move


};