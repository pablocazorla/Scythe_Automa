/* VIEW: AI STAR *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_ai_star',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: _i('Gain a star'),
		txt_gain: ko.observable(''),
		txt_continue: _i('Continue'),
		title: ko.observable(''),
		icon: ko.observable(''),
		playerName: ko.observable(''),
		playerIcon: ko.observable(''),

		worker: ko.observable(0),
		mech: ko.observable(0),
		power: ko.observable(0),
		money: ko.observable(0),
		card: ko.observable(0),

		txt_1: ko.observable(''),
		txt_2: _i('Place the star on the triumph track.')
	};

	vm.continueAction = function () {		
		// putAIstar = GAME.evaluateFinishTurnAI(player);
		// if(putAIStar){
		// 	// Goto put star
		// }else{
		// 	GAME.advancePlayer();
		// 	goToView('view_start_turn');
		// }
		if(putAIstar.reason === 'war'){
			goToView('view_attack_war_resources');
		}	
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			var player = putAIstar.player

			vm.title(_i(capitalize(player.factionName)));
			vm.icon('images/factions/' + player.factionName + '.png');
			
			vm.playerName(_i(player.name));
			vm.playerIcon(player.icon);

			var txt = '';

			switch(putAIstar.reason){
				case 'power':
					txt = _i('%faction reaches the end of the power track');
					txt = txt.replace('%faction',_i(capitalize(player.factionName)));

					player.board.starsByPower--;

					break;
				case 'war':
					txt = _i('%faction wins its %numº star for combat');
					txt = txt.replace('%faction',_i(capitalize(player.factionName)));

					var num = 2 - player.board.starsByWar + 1;
					txt = txt.replace('%num', num);

					player.board.starsByWar--;

					break;
				case 'advance':
					txt = _i('%faction wins its %numº star');
					txt = txt.replace('%faction',_i(capitalize(player.factionName)));

					var num = 6 - player.board.stars + 1;
					txt = txt.replace('%num', num);
					break;
				default:
				//
			}
			vm.txt_1(txt);

			// Quit a star
			player.board.stars--;
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: AI STAR *****************************/