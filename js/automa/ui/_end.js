	function force(vn){
		bindAllModels();
		presentationVM.current(false);
		goToView(vn);
	}
	
	GAME = createGame([2,0,1]);
//
force('view_start_turn');
//force('view_map');


})();
/* END UI *******************************************/