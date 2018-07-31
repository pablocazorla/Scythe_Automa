	function force(vn){
		bindAllModels();
		presentationVM.current(false);
		goToView(vn);
	}
	
	GAME = createGame([5,0,5]);
//
//force('view_ai_star');
force('view_start_turn');


})();
/* END UI *******************************************/