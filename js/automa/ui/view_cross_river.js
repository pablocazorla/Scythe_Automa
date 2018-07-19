/* VIEW: CAN CROSS RIVERS *****************************/
viewModelList.push(function() {
	var vm = {
		/*-----------------------*/
		viewName: 'view_cross_river',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: _i('Now can cross rivers'),
		txt_continue:  _i('Continue'),
		title: ko.observable(''),
		icon: ko.observable(''),
		playerName: ko.observable(''),
		playerIcon: ko.observable('')
	};	

	vm.continueAction = function(){
		if(currentPlayer.ai){
			//
		}else{
			goToView('view_human_start');
		}
	};

	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
		if(GAME && newValue === vm.viewName){
			currentPlayer = GAME.getCurrentPlayer();
			vm.title(_i(capitalize(currentPlayer.factionName)));
			vm.icon('images/factions/' + currentPlayer.factionName + '.png');
			vm.playerName(_i(currentPlayer.name));
			vm.playerIcon(currentPlayer.icon);
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: CAN CROSS RIVERS *****************************/