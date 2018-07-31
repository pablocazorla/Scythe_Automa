/* VIEW: ATTACK WORKERS RESOURCES *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_attack_war_resources',
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
		txt_tit: _i('Combat!'),
		txt_attack: ko.observable(''),
		txt_result: ko.observable(''),
		txt_continue: _i('Continue'),
		resourceList: ko.observableArray(),
		resourceListVisible: ko.observable(false),
		allResources: ko.observable(false),

		selectedPlayer: ko.observable(null)
	};
	var hex_attack;

	vm.continueAction = function () {
		GAME.hexConflict = GAME.evaluateAttack();
		if (GAME.hexConflict.workers.length > 0) {
			// Attack workers
			goToView('view_attack_worker');
		} else {
			if (GAME.hexConflict.war) {
				// War
				goToView('view_war');
			} else {
				var hexEncounter = GAME.evaluateEncounter();
				if (hexEncounter) {
					// Encounter
					goToView('view_encounter');
				} else {
					if (!currentPlayer.ai) {
						//continue to human start
						goToView('view_human_start');
					} else {
						// continue to evaluate AI resources
						goToView('view_ai_resources');
					}
				}
			}
		}

	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			var p1, p2, num_of_Worker = 0;
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

				var winner = hex_attack.attack.faction === hex_attack.winner ? p1 : p2,
					loser = hex_attack.attack.faction === hex_attack.winner ? p2 : p1,
					winner_p = hex_attack.attack.faction === hex_attack.winner ? 'p1' : 'p2';				
				vm.selectedPlayer(winner_p);

				// p1 = GAME.getPlayerByFaction(hex_attack.attack.faction);
				// p2 = GAME.getPlayerByFaction(hex_attack.faction);

				// vm.title_1(_i(capitalize(p1.factionName)));
				// vm.icon_1('player-icon-unit ' + p1.factionName);
				// vm.playerName_1(_i(p1.name));
				// vm.playerIcon_1(p1.icon);
				// vm.title_2(_i(capitalize(p2.factionName)));
				// vm.icon_2('player-icon-unit ' + p2.factionName);
				// vm.playerName_2(_i(p2.name));
				// vm.playerIcon_2(p2.icon);

				// var textAttack = num_of_Worker === 1 ? 'attack % worker' : 'attack % workers',
				// 	i_textAttack = _i(textAttack);
				// vm.txt_attack(i_textAttack.replace('%', num_of_Worker));

				if (!currentPlayer.ai) {
					// attack human

					if (p2.ai) {
						// vs. ai

						if(winner.factionName === currentPlayer.factionName){	

							vm.allResources(false);
							var typeRes = hex_attack.type;

							var required = typeRes === 'iron' || typeRes === 'farm' || typeRes === 'oil' || typeRes === 'wood';

							if (GAME.aiResources > 0 && required) {

								var txt_result = _i('Put %num %type in the territory.');

								txt_result = txt_result.replace('%num', GAME.aiResources);
								txt_result = txt_result.replace('%type', typeRes);

								vm.txt_result(txt_result);

								var list = [],
									counter = GAME.aiResources;

								while (counter > 0) {
									list.push({
										type: typeRes
									});
									counter--;
								}
								vm.resourceListVisible(true);
								vm.resourceList(list);

							} else {
								vm.resourceListVisible(false);
								vm.txt_result(_i('There are not resources in the territory.'));
							}
						} else {
							vm.resourceListVisible(false);
							vm.allResources(false);
							var txt_result = _i('%faction does not obtain any resource in the territory.');
							txt_result = txt_result.replace('%faction', _i(capitalize(currentPlayer.factionName)));
							vm.txt_result(txt_result);
						}


					} else {
						// vs. human
						vm.resourceListVisible(false);
						if(winner.factionName === currentPlayer.factionName){							
							vm.allResources(true);
							var txt_result = _i('%faction obtain all resources in the territory.');
							txt_result = txt_result.replace('%faction', _i(capitalize(currentPlayer.factionName)));
							vm.txt_result(txt_result);
						}else{
							vm.allResources(false);
							var txt_result = _i('%faction does not obtain any resource in the territory.');
							txt_result = txt_result.replace('%faction', _i(capitalize(currentPlayer.factionName)));
							vm.txt_result(txt_result);
						}
					}




				} else {
					// attack ai
					vm.resourceListVisible(false);
					if(winner.factionName === currentPlayer.factionName){	
						vm.allResources(true);
						vm.txt_result(_i('Remove all resources of the territory.'));
					}else{
						vm.allResources(false);
						var txt_result = _i('%faction does not obtain any resource in the territory.');
						txt_result = txt_result.replace('%faction', _i(capitalize(currentPlayer.factionName)));
						vm.txt_result(txt_result);
					}
				}




			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: ATTACK WORKERS RESOURCES *****************************/