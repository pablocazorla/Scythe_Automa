var factionBtnVM = function(factionIndex, playerTypeIndex) {


	var faction = GAMECONFIG.factions[factionIndex];

	// Initial Player
	var player = GAMECONFIG.playerTypes[playerTypeIndex];
	var className = player.name === 'None' ? 'disabled' : faction.name;

	var vm = {
		title: _i(capitalize(faction.name)),
		className: ko.observable('faction-item ' + className),
		icon: 'images/factions/' + faction.name + '.png',
		power: faction.power,
		cards: faction.cards,
		playerName: ko.observable(_i(player.name)),
		playerIcon: ko.observable(player.icon),
		playerTypeIndex: playerTypeIndex
	};


	var length = GAMECONFIG.playerTypes.length;


	vm.changePlayer = function(){
		playerTypeIndex++;
		playerTypeIndex = playerTypeIndex >= length ? 0 : playerTypeIndex;

		var player = GAMECONFIG.playerTypes[playerTypeIndex];
		var className = player.name === 'None' ? 'disabled' : faction.name;

		vm.className('faction-item ' + className);
		vm.playerName(_i(player.name));
		vm.playerIcon(player.icon);

		vm.playerTypeIndex = playerTypeIndex;
	};

	return vm;
};


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

	var facts = [];
	for (var i = 0; i < 7; i++) {
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
				areHumans = true;
			}
			if(fact.playerTypeIndex > 1){
				areAI = true;
			}
			factionsToStart.push(fact.playerTypeIndex);
		});		
		
		if(areHumans && areAI){
			GAME = createGame(factionsToStart);
			goToView('view_start_turn');			
		}else{
			showAlert(_i('Please, select almost 1 Human player and 1 Automa player.'));
		}
	};

	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});