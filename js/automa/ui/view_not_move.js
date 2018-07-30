/* VIEW: NOT MOVE *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_not_move',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: ko.observable(''),
		txt_continue: _i('Continue'),
		title: ko.observable(''),
		icon: ko.observable(''),
		playerName: ko.observable(''),
		playerIcon: ko.observable(''),
	};

	vm.continueAction = function () {		
		// continue to evaluate AI resources
		log('continue to evaluate AI resources');
		goToView('view_ai_resources');
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			currentPlayer = GAME.getCurrentPlayer();

			vm.title(_i(capitalize(currentPlayer.factionName)));
			vm.icon('images/factions/' + currentPlayer.factionName + '.png');
			
			vm.playerName(_i(currentPlayer.name));
			vm.playerIcon(currentPlayer.icon);

			var txt = _i('%faction does not move any unit this turn.');

			txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));

			vm.txt_title(txt);
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: NOT MOVE *****************************/