//Presentation
var presentationVM = (function() {
	var vm = {
		current: ko.observable(true),
		lan: ko.observable('English'),
		languages: [],
		txt_continue: ko.observable(_i('Continue'))
	};

	if (window.scytheLanguages) {
		vm.isLang = true;
		vm.languages.push('English');
		window.scytheLanguages.forEach(function(lang) {
			vm.languages.push(lang.name);
		})
	} else {
		vm.isLang = false;
	}
	vm.lan.subscribe(function(v){		
		setLanguage(v);
		// texts
		vm.txt_continue(_i('Continue'));
	});

	vm.continueAction = function(){
		bindAllModels();
		vm.current(false);
		goToView('view_new');
	};



	ko.applyBindings(vm, document.getElementById('presentation'));
	return vm;
})();

// setTimeout(function(){
// 	presentationVM.continueAction();
// },300);

