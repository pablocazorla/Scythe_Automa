	function force(vn){
		bindAllModels();
		presentationVM.current(false);
		goToView(vn);
	}
	
	GAME = createGame([1,0,2]);
	force('view_human_start');


})();
/* END UI *******************************************/