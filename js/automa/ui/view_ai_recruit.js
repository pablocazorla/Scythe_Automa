/* VIEW: AI RECRUIT *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_ai_recruit',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: _i('Gain for recruit'),
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
		iconClass: ko.observable(''),
		iconSrc: ko.observable('')
	};

	vm.continueAction = function () {		
		var putAIStar = GAME.evaluateFinishTurnAI(currentPlayer);
		if(putAIStar){
			// Goto put star
		}else{
			GAME.advancePlayer();
			goToView('view_start_turn');
		}		
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			currentPlayer = GAME.getCurrentPlayer();

			vm.title(_i(capitalize(currentPlayer.factionName)));
			vm.icon('images/factions/' + currentPlayer.factionName + '.png');
			
			vm.playerName(_i(currentPlayer.name));
			vm.playerIcon(currentPlayer.icon);

			var typeRecruit = AI_actions.recruit;
			var images = {
				'popularity':'popularity',
				'card':'card-power',
				'power':'power',
				'money':'money',
			};

			vm.iconClass('item for-'+typeRecruit);
			vm.iconSrc('images/'+images[typeRecruit]+'.svg');
			
			// card
			// power
			// money
			// popularity
			var txt = _i('if you have enlisted the %type recruit, then you gain the %type recruit bonus.');
			txt = txt.replace(new RegExp('%type', 'g'),typeRecruit);
			vm.txt_1(txt);
	
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: AI RECRUIT *****************************/