viewModels.push(function() {
	/*-----------------------*/
	var viewName = 'view_new';
	/*-----------------------*/

	var vm = {		
		current: ko.observable(false),
		// texts
		txt_title: _i('New game'),
		txt_present: _i('Choose factions and players:')
	};



	currentView.subscribe(function(newValue) {
		vm.current(newValue === viewName);
	});
	ko.applyBindings(vm, document.getElementById(viewName));
});