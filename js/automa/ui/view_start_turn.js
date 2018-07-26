/* VIEW: START TURN *****************************/
viewModelList.push(function() {
	var vm = {
		/*-----------------------*/
		viewName: 'view_start_turn',
		/*-----------------------*/
		current: ko.observable(false),
		// texts
		txt_title: _i('Turn of'),
		txt_continue:  _i('Continue'),
		title: ko.observable(''),
		icon: ko.observable(''),
		playerName: ko.observable(''),
		playerIcon: ko.observable(''),
		ai: ko.observable(false),
		timeline: ko.observableArray(),
		ai_position: ko.observable(''),
		classMarker: ko.observable('')
	};	

	vm.continueAction = function(){
		if(currentPlayer.ai){
			//
			goToView('view_map');
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
			vm.classMarker(currentPlayer.factionName);
			vm.playerName(_i(currentPlayer.name));
			vm.playerIcon(currentPlayer.icon);
			vm.ai(currentPlayer.ai);

			// timeline
			var timeline = [];
			if (currentPlayer.timeline){
				var notRiver = true,
					x = 0,y = 0,
					step_x = 0,
					step_y = 0;

				currentPlayer.timeline.forEach(function(t,i){
					if (t.crossRiver && notRiver){
						notRiver = false;
					}
					var o = {notRiver: notRiver};
					o.star = t.star ? true:false;
					o.one = i === 0 ? true : false;
					o.two = t.changeEstrategy ? true : false;

					timeline.push(o);

					if (currentPlayer.step === i){
						step_x = x;
						step_y = y;
					}
					x++;
					if(x >= 4){
						x = 0;
						y++;
					}
				});
			}
			vm.timeline(timeline);
			var w = 176/4,
				sty = 'top:' + ((w+1) * step_y) + 'px;';
			sty += 'left:' + (w * step_x) + 'px';
			vm.ai_position(sty);



			GAME.evaluateAI(currentPlayer);



		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: START TURN *****************************/