/* VIEW: NEW *****************************/
/* Faction Button */
var factionBtnVM = function(factionIndex, playerTypeIndex) {

	// Initial Player
	var faction = GAMECONFIG.factions[factionIndex],	
		player = GAMECONFIG.playerTypes[playerTypeIndex],
		playerTypesLength = GAMECONFIG.playerTypes.length,
		className = player.name === 'None' ? 'disabled' : faction.name;

	var vm = {
		title: _i(capitalize(faction.name)),
		playerTypeIndex: playerTypeIndex,
		icon: 'images/factions/' + faction.name + '.png',
		power: faction.power,
		cards: faction.cards,
		className: ko.observable('faction-item ' + className),
		playerName: ko.observable(_i(player.name)),
		playerIcon: ko.observable(player.icon)		
	};

	vm.changePlayer = function(){
		vm.playerTypeIndex++;
		vm.playerTypeIndex = vm.playerTypeIndex >= playerTypesLength ? 0 : vm.playerTypeIndex;

		var player = GAMECONFIG.playerTypes[vm.playerTypeIndex],
			className = player.name === 'None' ? 'disabled' : faction.name;

		vm.className('faction-item ' + className);
		vm.playerName(_i(player.name));
		vm.playerIcon(player.icon);
	};

	return vm;
};

/* View New VM */
viewModelList.push(function() {

	var vm = {
		/*-----------------------*/
		viewName: 'view_new',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: _i('New game'),
		txt_present: _i('Choose factions and players:'),
		txt_continue:  _i('Continue')
	};

	// Create Faction Buttons
	var facts = [];
	for (var i = 0; i < GAMECONFIG.factions.length; i++) {
		var playerTypeIndex = 0;
		playerTypeIndex = i === 0 ? 1 : playerTypeIndex; // human
		playerTypeIndex = i === 2 ? 2 : playerTypeIndex; // ai - autometta

		var newFact = factionBtnVM(i, playerTypeIndex);
		facts.push(newFact);
	};
	vm.factions = ko.observableArray(facts);

	vm.continueAction = function(){
		var factions = vm.factions(),
			areHumans = false,
			areAI = false,
			factionsToStart = [];

		factions.forEach(function(fact){
			if(fact.playerTypeIndex === 1){
				areHumans = true; // There is Human player
			}
			if(fact.playerTypeIndex > 1){
				areAI = true; // There is AI player
			}
			factionsToStart.push(fact.playerTypeIndex);
		});		
		
		//if(areHumans && areAI){
			GAME = createGame(factionsToStart);
			goToView('view_start_turn');			
		//}else{
		// 	showAlert(_i('Please, select almost 1 Human player and 1 Automa player.'));
		//}
	};

	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: NEW *****************************/