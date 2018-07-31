/* VIEW: BETWEEN AIs *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_war_bet_ai',
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
		txt_subtit: _i('between automas'),
		txt_cop: _i('And the WINNER is:'),
		txt_attackWith: _i('Attack with'),
		txt_help: ko.observable(''),
		txt_pow1: ko.observable(0),
		txt_pow2: ko.observable(0),
		selectedPlayer: ko.observable(null),
		step:ko.observable(1),
	};

	var p1, p2, hex_attack, results = null;

	vm.selectP1 = function () {
		vm.selectedPlayer('p1');
	};
	vm.selectP2 = function () {
		vm.selectedPlayer('p2');
	};

	vm.continueAction = function () {
		if(vm.step() === 1){
			vm.step(2);
			vm.selectedPlayer(results.player1.winner ? 'p1':'p2');
			var txtHelp = _i('$faction1 must reduce its power in %val1 (to %val1c), and $faction2 must reduce its power in %val2 (to %val2c).');
			txtHelp = txtHelp.replace('$faction1', capitalize(p1.factionName));
			txtHelp = txtHelp.replace('%val1', results.player1.reduce);
			txtHelp = txtHelp.replace('%val1c', p1.power);
			txtHelp = txtHelp.replace('$faction2', capitalize(p2.factionName));
			txtHelp = txtHelp.replace('%val2', results.player2.reduce);
			txtHelp = txtHelp.replace('%val2c', p2.power);
			vm.txt_help(txtHelp);

		}else{
			var f_win = vm.selectedPlayer();
			var fact = f_win === 'p1' ? p1.factionName : p2.factionName;
			
			hex_attack.winner = fact;
			goToView('view_war_results');
		}
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			vm.selectedPlayer(null);
			vm.step(1);
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

				results = GAME.combatBetweenAIs(p1,p2);

				vm.txt_pow1(results.player1.reduce);
				vm.txt_pow2(results.player2.reduce);
			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: BETWEEN AIs *****************************/