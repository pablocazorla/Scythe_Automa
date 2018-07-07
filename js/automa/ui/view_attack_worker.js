viewModelList.push(function () {

	var vm = {

		/*-----------------------*/
		viewName: 'view_attack_worker',
		/*-----------------------*/

		current: ko.observable(false),

		// texts
		title_1: ko.observable(''),
		icon_1: ko.observable('player-icon-unit'),
		playerName_1: ko.observable(''),
		playerIcon_1: ko.observable(''),

		title_2: ko.observable(''),
		icon_2: ko.observable('player-icon-unit'),
		playerName_2: ko.observable(''),
		playerIcon_2: ko.observable(''),

		numWorker: ko.observable(''),
		txt_attack: _i('attack'),
		txt_of: _i('of'),

		// txt_choose:  _i('Please, choose one action to do:'),
		// txt_move_add:  _i('MOVE or ADD units'),
		txt_continue: _i('End your turn')
	};

	var currentPlayer = null;

	var evaluateAttack = function () {
		var hex_attack = null;
		if (GAME) {
			
			for (var a in GAME.MAP) {
				var h = GAME.MAP[a];
				if (h.attack) {
					if (h.people.mech === 0 && h.people.character === 0) {
						hex_attack = cloneObject(h);
					}
				}
			}
			if (hex_attack) {
				var p1 = GAME.getPlayerByFaction(hex_attack.attack.faction);

				vm.title_1(_i(capitalize(p1.factionName)));
				vm.icon_1('player-icon-unit '+p1.factionName);
				vm.playerName_1(_i(p1.name));
				vm.playerIcon_1(p1.icon);

				var p2 = GAME.getPlayerByFaction(hex_attack.faction);

				vm.title_2(_i(capitalize(p2.factionName)));
				vm.icon_2('player-icon-unit '+p2.factionName);
				vm.playerName_2(_i(p2.name));
				vm.playerIcon_2(p2.icon);

				var num_of_Worker = hex_attack.people.worker;
				vm.numWorker(num_of_Worker + ' ' + (num_of_Worker > 1 ? _i('workers'):_i('worker')));

				// send workers to base
				var baseIndex = GAME.getBaseMapIndex(hex_attack.faction);
				GAME.MAP[baseIndex].faction = hex_attack.faction;
				GAME.MAP[baseIndex].people.worker += num_of_Worker;

				// quit of hex_attack
				GAME.MAP[hex_attack.num].faction = hex_attack.attack.faction;
				GAME.MAP[hex_attack.num].people.worker = 0;

				GAME.MAP[hex_attack.num].people.mech = hex_attack.attack.mech || 0;
				GAME.MAP[hex_attack.num].people.character = hex_attack.attack.character || 0;
				GAME.MAP[hex_attack.num].attack = null;
				
			}
			console.log(GAME.MAP);
		}
		return hex_attack;
	};


	vm.continueAction = function () {
		// GAME.advancePlayer();
		// goToView('view_start_turn');
	};

	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		
			
			evaluateAttack();

			
		
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});