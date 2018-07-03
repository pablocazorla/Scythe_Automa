viewModelList.push(function() {
	var vm = {

		/*-----------------------*/
		viewName: 'view_alert',
		/*-----------------------*/

		current: ko.observable(false),
		// texts
		txt_ok: _i('Ok'),
		text:  ko.observable('')
	};

	vm.closeAlert = function(){
		alertViewText('');
	};

	alertViewText.subscribe(function(newValue) {
		vm.current(newValue !== '');
		vm.text(newValue);
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});