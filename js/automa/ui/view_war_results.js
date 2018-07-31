/* VIEW: WAR RESULTS *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_war_results',
		/*-----------------------*/

		current: ko.observable(false),
		// draw
		mechPoints: SVG.mech.points,
		// texts
		title_1: ko.observable(''),
		icon_1: ko.observable('player-icon-unit'),
		playerName_1: ko.observable(''),
		playerIcon_1: ko.observable(''),
		title_2: ko.observable(''),
		icon_2: ko.observable('player-icon-unit'),
		playerName_2: ko.observable(''),
		playerIcon_2: ko.observable(''),		
		txt_continue: _i('Continue'),
		txt_tit: _i('Combat!'),
		txt_cop: _i('Results of:'),
		txt_help1: ko.observable(''),
		txt_help2: ko.observable(''),

		selectedPlayer: ko.observable(null)
	};

	var p1, p2, hex_attack, winner, loser = null;
	vm.continueAction = function () {
		//debugger;
		// CONTINUE
		// GAME.hexConflict = GAME.evaluateAttack();		
		// if (GAME.hexConflict.war) {
		// 	goToView('view_war');
		// } else {
		// 	var hexEncounter = GAME.evaluateEncounter();
		// 	if (hexEncounter) {
		// 		// Encounter
		// 		goToView('view_encounter');
		// 	} else {
		// 		if(!currentPlayer.ai){
		// 			//continue to human start
		// 			goToView('view_human_start');
		// 		}else{
		// 			// continue to evaluate AI resources
		// 		}
		// 	}
		// }
		if(winner.board.starsByWar >= 0){
			// Place star by war
			putAIstar = {
				reason: 'war',
				player: winner
			};
			goToView('view_ai_star');
		}else{
			goToView('view_attack_war_resources');
		}		
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			//vm.selectedPlayer(null);
			hex_attack = GAME.hexConflict.war;
			if (hex_attack) {
				p1 = GAME.getPlayerByFaction(hex_attack.attack.faction);
				p2 = GAME.getPlayerByFaction(hex_attack.faction);
				vm.title_1(_i(capitalize(p1.factionName)));
				vm.icon_1('player-icon-unit ' + p1.factionName);
				vm.playerName_1(_i(p1.name));
				vm.playerIcon_1(p1.icon);
				vm.title_2(_i(capitalize(p2.factionName)));
				vm.icon_2('player-icon-unit ' + p2.factionName);
				vm.playerName_2(_i(p2.name));
				vm.playerIcon_2(p2.icon);
				
				winner = hex_attack.attack.faction === hex_attack.winner ? p1 : p2;
				loser = hex_attack.attack.faction === hex_attack.winner ? p2 : p1;
				//debugger;
				var winner_p = hex_attack.attack.faction === hex_attack.winner ? 'p1' : 'p2';				
				vm.selectedPlayer(winner_p);
				var textHelp1 = _i('$faction, the losing faction, must retreat all of their units (mechs, characters, and workers) from the combat territory to their home base.');
				textHelp1 = textHelp1.replace('$faction', capitalize(loser.factionName));
				vm.txt_help1(textHelp1);
				
				// winner.board.starsByWar--;
				// if(winner.board.starsByWar >= 0){
				// 	winner.board.stars--;
				// 	var textHelp2 = _i('$faction, the winner faction, places 1 star token in the combat space of the Triumph Track.');
				// 	textHelp2 = textHelp2.replace('$faction', capitalize(winner.factionName));
				// 	vm.txt_help2(textHelp2);
				// }else{
				// 	vm.txt_help2('');
				// }				
				
				var baseIndex = GAME.getBaseMapIndex(loser.factionName);
				
				if(winner_p === 'p1'){
					// if attack wins
					// send units defenders to base
					GAME.MAP[baseIndex].people.worker += hex_attack.people.worker;
					GAME.MAP[baseIndex].people.mech += hex_attack.people.mech;
					GAME.MAP[baseIndex].people.character += hex_attack.people.character;

					// Renew faction, mech and/or character
					GAME.MAP[hex_attack.num].faction = hex_attack.attack.faction;
					GAME.MAP[hex_attack.num].people.worker = 0;
					GAME.MAP[hex_attack.num].people.mech = hex_attack.attack.mech || 0;
					GAME.MAP[hex_attack.num].people.character = hex_attack.attack.character || 0;
				}else{
					// if defend wins
					// send units attackers to base
					GAME.MAP[baseIndex].people.mech += hex_attack.attack.mech || 0;
					GAME.MAP[baseIndex].people.character += hex_attack.attack.character || 0;
				}

				// Reset attack
				GAME.MAP[hex_attack.num].attack = null;
				
			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: WAR RESULTS *****************************/