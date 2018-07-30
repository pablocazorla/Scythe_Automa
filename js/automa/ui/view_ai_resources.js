/* VIEW: AI RESOURCES *****************************/
viewModelList.push(function () {
	var vm = {
		/*-----------------------*/
		viewName: 'view_ai_resources',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: _i('Resources for'),
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
		txt_2: ko.observable(''),
		txt_3: ko.observable('')
	};

	vm.continueAction = function () {		
		if(currentPlayer.power >= 16 && currentPlayer.board.starsByPower > 0){
			// Gain a Star for power
			// Goto put star
		}else{
			if(AI_actions.recruit){
				// Goto AI recruit
				goToView('view_ai_recruit');
			}else{
				var putAIStar = GAME.evaluateFinishTurnAI(currentPlayer);
				if(putAIStar){
					// Goto put star
				}else{
					GAME.advancePlayer();
					goToView('view_start_turn');
				}
			}
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

			var txt = _i('%faction gets:');

			txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));

			vm.txt_gain(txt);
			
			
			var textArray = [];

			for(var a in AI_actions.gain){
				var n = AI_actions.gain[a];
				vm[a](n);
				if(n > 0){
					switch(a){
						case 'worker':
							var txt = _i("Deploy %num worker to the %faction's home base.");
							txt = n > 1 ? txt.replace(_i('worker'),_i('workers')) : txt;
							txt = txt.replace('%num',n);
							txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));
							textArray.push({
								order:4,
								txt:txt
							});
							break;
						case 'mech':
							var txt = _i("Deploy %num mech to the %faction's home base.");
							txt = n > 1 ? txt.replace(_i('mech'),_i('mechs')) : txt;
							txt = txt.replace('%num',n);
							txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));
							textArray.push({
								order:5,
								txt:txt
							});
							break;
						case 'money':
							var txt = _i("%faction obtain %num of money.");
							txt = txt.replace('%num',n);
							txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));
							textArray.push({
								order:1,
								txt:txt
							});
							break;
						case 'card':
							var txt = _i("%faction obtain %num card.");
							txt = n > 1 ? txt.replace(_i('card'),_i('cards')) : txt;
							txt = txt.replace('%num',n);
							txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));
							textArray.push({
								order:3,
								txt:txt
							});
							break;
						case 'power':
							var txt = _i("%faction increases his power in %num.");
							txt = txt.replace('%num',n);
							txt = txt.replace('%faction',capitalize(_i(currentPlayer.factionName)));
							textArray.push({
								order:2,
								txt:txt
							});
							break;
						default:
							//
					}
				}
			}

			textArray.sort(function(a,b){
				return a.order < b.order ? -1 : 1;
			});

			for(var k = 0; k < textArray.length; k++){
				if(k < 3){
					vm['txt_'+(k+1)](textArray[k].txt);
				}
			}

			// Add to map
			currentPlayer.board.worker -= AI_actions.gain.worker;
			currentPlayer.board.mech -= AI_actions.gain.mech;
			var baseMapNum = GAME.getBaseMapIndex(currentPlayer.factionName);
			GAME.MAP[baseMapNum].people.worker += AI_actions.gain.worker;
			GAME.MAP[baseMapNum].people.mech += AI_actions.gain.mech;

			// Add power
			currentPlayer.power += AI_actions.gain.power;

			// Add money
			currentPlayer.money += AI_actions.gain.money;

			// Add cards
			currentPlayer.cards += AI_actions.gain.card;
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: AI RESOURCES *****************************/