var view_presentation = (function() {
	var vm = {
		current: ko.observable()
	};













	currentView.subscribe(function(newValue) {
		vm.current(newValue === 'view_presentation')
	});
	ko.applyBindings(vm, document.getElementById('view_presentation'));
	return vm;
})();