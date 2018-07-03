viewModelList.push(function() {

	var vm = {

		/*-----------------------*/
		viewName: 'view_human_start',
		/*-----------------------*/

		current: ko.observable(false),

		// texts
		title: ko.observable(''),
		icon: ko.observable(''),
		playerName: ko.observable(''),
		playerIcon: ko.observable(''),

		txt_choose:  _i('Please, choose one action to do:'),		
		txt_add:  _i('ADD a worker or mech'),
		txt_move:  _i('MOVE a worker or mech'),
		txt_continue:  _i('End your turn')		
	};

	var currentPlayer = null;

	vm.addAction = function(){
		
	};
	vm.moveAction = function(){
		
	};
	vm.continueAction = function(){
		GAME.advancePlayer();
		goToView('view_start_turn');
	};

	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
		if(GAME){
			currentPlayer = GAME.currentPlayer();
			vm.title(_i(capitalize(currentPlayer.factionName)));
			vm.icon('images/factions/' + currentPlayer.factionName + '.png');
			vm.playerName(_i(currentPlayer.name));
			vm.playerIcon(currentPlayer.icon);
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});