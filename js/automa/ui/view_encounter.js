/* VIEW: ENCOUNTER *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_encounter',
		/*-----------------------*/
		current: ko.observable(false),

		// draw
		mechPoints: SVG.character.points,

		// texts
		title_1: ko.observable(''),
		icon_1: ko.observable('player-icon-unit big'),
		playerName_1: ko.observable(''),
		playerIcon_1: ko.observable(''),
		
		txt_tit: _i('Encounter'),
		txt_result: ko.observable('Remove the encounter token from the territory'),
		txt_continue: _i('Continue')
	};

	vm.continueAction = function () {
		if (GAME.hexConflict.workers.length > 0) {
			// Attack workers
			goToView('view_attack_worker');
		} else {
			if (GAME.hexConflict.war) {
				// War
				goToView('view_war');
			} else {
				if (!currentPlayer.ai) {
					//continue to human start
					goToView('view_human_start');
				} else {
					// continue to evaluate AI resources
				}				
			}
		}
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			var p1, hex = GAME.evaluateEncounter();

			if (hex) {
				p1 = GAME.getPlayerByFaction(hex.faction);
				vm.title_1(_i(capitalize(p1.factionName)));
				vm.icon_1('player-icon-unit big ' + p1.factionName);
				vm.playerName_1(_i(p1.name));
				vm.playerIcon_1(p1.icon);

				GAME.MAP[hex.num].encounter = false;
			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: ENCOUNTER *****************************/