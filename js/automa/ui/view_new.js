var view_new = (function() {
	var vm = {
		current: ko.observable()
	};















	currentView.subscribe(function(newValue) {
		vm.current(newValue === 'view_new')
	});
	ko.applyBindings(vm, document.getElementById('view_new'));
	return vm;
})();