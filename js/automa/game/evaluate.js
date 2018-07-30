G.evaluateAI = function (player) {
	var card = getCard();

	// Set resources to gain from AI
	G.aiResources = card.resources;

	var aiActions = null;

	// if is Autometta and skip card
	if (card.notAutometta && player.name === 'Autometta') {
		// SKIP TURN (Autometta)
	} else {
		// 1- MOVEMENT
		var moveChoice = null,
			moves = card['e' + player.strategy].move;
		moves.forEach(function (m) {
			if (!moveChoice) {
				var validFaction = m.faction ? m.faction === player.factionName : true,
					canAttack = true;
				if (m.attack && m.attack !== 'worker') {
					if (m.attack > player.power) {
						canAttack = false;
					}
				}
				if (validFaction && canAttack) {
					moveChoice = AUTOMA.move(m, player);
				}
			}
		});
		aiActions = {move: moveChoice};

		// 2- RESOURCES
		var gains = card['e' + player.strategy].gain;
		aiActions.gain = AUTOMA.gain(gains, player);
	
		// 3- RECRUIT
		aiActions.recruit = card['e' + player.strategy].recruit;
	}

	return aiActions;
};

G.evaluateFinishTurnAI = function (player) {
	return false;
};