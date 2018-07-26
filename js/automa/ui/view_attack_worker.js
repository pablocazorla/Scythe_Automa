/* VIEW: ATTACK WORKERS *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_attack_worker',
		/*-----------------------*/
		current: ko.observable(false),

		// draw
		workerPoints: SVG.worker.points,
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
		txt_attack: ko.observable(''),
		txt_result: ko.observable(''),
		txt_continue: _i('Continue')
	};

	var p1, p2;

	vm.continueAction = function () {
		
		// GAME.advancePlayer();
		if (p1.ai && p2.ai) {
			GAME.hexConflict.workers.shift();
			log(GAME.hexConflict);
			if (GAME.hexConflict.workers.length > 0) {
				// Attack workers
				goToView('view_none');
				setTimeout(function(){
					goToView('view_attack_worker');
				},200);
			} else {
				if (GAME.hexConflict.war) {
					// War
					goToView('view_war');
				} else {
					var hexEncounter = GAME.evaluateEncounter();
					if(hexEncounter){
						// Encounter
						goToView('view_encounter');
					}else{
						if (!currentPlayer.ai) {
							//continue to human start
							goToView('view_human_start');
						} else {
							// continue to evaluate AI resources
							log('Evaluate');
						}
					}
				}
			}
		} else {
			goToView('view_attack_worker_resources');
		}
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			var baseIndex, num_of_Worker = 0;

			if (GAME.hexConflict.workers.length > 0) {
				var hex_attack = GAME.hexConflict.workers[0];

				p1 = GAME.getPlayerByFaction(hex_attack.attack.faction);
				p2 = GAME.getPlayerByFaction(hex_attack.faction);
				baseIndex = GAME.getBaseMapIndex(hex_attack.faction);

				num_of_Worker = hex_attack.people.worker;

				// send workers to base
				GAME.MAP[baseIndex].people.worker += hex_attack.people.worker;

				// quit of hex_attack				
				GAME.MAP[hex_attack.num].people.worker = 0;

				// Renew faction, mech and/or character
				GAME.MAP[hex_attack.num].faction = hex_attack.attack.faction;
				GAME.MAP[hex_attack.num].people.mech = hex_attack.attack.mech || 0;
				GAME.MAP[hex_attack.num].people.character = hex_attack.attack.character || 0;

				// Reset attack
				GAME.MAP[hex_attack.num].attack = null;

				vm.title_1(_i(capitalize(p1.factionName)));
				vm.icon_1('player-icon-unit ' + p1.factionName);
				vm.playerName_1(_i(p1.name));
				vm.playerIcon_1(p1.icon);
				vm.title_2(_i(capitalize(p2.factionName)));
				vm.icon_2('player-icon-unit ' + p2.factionName);
				vm.playerName_2(_i(p2.name));
				vm.playerIcon_2(p2.icon);

				var textAttack = num_of_Worker === 1 ? 'attack % worker' : 'attack % workers',
					i_textAttack = _i(textAttack);
				vm.txt_attack(i_textAttack.replace('%', num_of_Worker));

				var i_textTerritories = '';

				var textResult = _i('Each of $faction-2’s workers on that territory immediately retreats to their faction’s home base, leaving behind any resource tokens. $faction-1 loses % popularity for the workers he forced to retreat (they’re not happy with you for forcing them off their land).'),
					i_textResult = textResult.replace('$faction-1', _i(capitalize(p1.factionName))).replace('$faction-2', _i(capitalize(p2.factionName))).replace('%', num_of_Worker);
				vm.txt_result(i_textResult);

				//	GAME.hexConflict.workers = [];
			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: ATTACK WORKERS *****************************/