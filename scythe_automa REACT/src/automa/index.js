import moveAI from './moveAI';
import gainAI from './gainAI';


const evaluateAI = (card,map,player) =>{

  let aiActions = null;

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
					moveChoice = moveAI(m, map, player);
				}
			}
		});
		aiActions = {move: moveChoice};

		// 2- RESOURCES
		var gains = card['e' + player.strategy].gain;
	  aiActions.gain = gainAI(gains, player);
	
		// 3- RECRUIT
    aiActions.recruit = card['e' + player.strategy].recruit;
    
    // 4-RESOURCES To LET
		aiActions.resources = card.resources ? card.resources : 0;
		
		// 5- ADVANCE
    aiActions.advanceStep = card.advance;
	}



  return aiActions;
};
export default evaluateAI;