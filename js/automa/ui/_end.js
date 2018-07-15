	function force(vn){
		bindAllModels();
		presentationVM.current(false);
		goToView(vn);
	}
	
	GAME = createGame([2,0,2,]);
	force('view_war');
	//force('view_map');


})();
/* END UI *******************************************/