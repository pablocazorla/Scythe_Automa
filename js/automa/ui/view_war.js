/* VIEW: WAR *****************************/
viewModelList.push(function() {

	var vm = {
		/*-----------------------*/
		viewName: 'view_war',
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
		txt_tit: _i('Combat!')
	};

	var p1,p2,hex_attack = null;

	vm.continueAction = function(){
		if(hex_attack){
			if(p1.ai && p2.ai){
				// between AIs
				goToView('view_war_bet_ai');
				//log('between AIsssss');
				//var a = GAME.combatBetweenAIs(p1,p2);
				//console.log(a);
			}else{
				if(!p1.ai && !p2.ai){
					// between Humans
					goToView('view_war_bet_humans');
				}else{
					// Human vs AI
					log('Human vs AI');
				}
			}
		}
	};

	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
		if (GAME && newValue === vm.viewName) {
			GAME.hexConflict = GAME.evaluateAttack();
			//console.log('GAME.hexConflict',GAME.hexConflict);
			hex_attack = GAME.hexConflict.war;
			if(hex_attack){
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
			}
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});