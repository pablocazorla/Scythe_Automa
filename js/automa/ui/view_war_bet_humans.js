/* VIEW: BETWEEN HUMANS *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_war_bet_humans',
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
		txt_subtit: _i('between humans'),
		txt_cop: _i('And the WINNER is:'),
		txt_help: _i('Select the winning faction of the combat.'),
		selectedPlayer: ko.observable(null)
	};

	var p1, p2, hex_attack = null;

	vm.selectP1 = function () {
		vm.selectedPlayer('p1');
	};
	vm.selectP2 = function () {
		vm.selectedPlayer('p2');
	};

	vm.continueAction = function () {
		var f_win = vm.selectedPlayer();
		if (f_win) {
			var fact = f_win === 'p1' ? p1.factionName : p2.factionName;
			GAME.setWinnerHex(hex_attack.num, fact);
			goToView('view_war_results');
		} else {
			showAlert(_i('Please, select the winning faction of the combat.'));
		}
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			vm.selectedPlayer(null);
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
			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: BETWEEN HUMANS *****************************/