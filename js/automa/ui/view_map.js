var hex_width = 120,
	hex_height = 132,

	dx_map = 65,
	dy_map = 30,
	marginHex = 0;


var hexagonMap = function(data) {
	var vm = {
		points: ''//'60,0 120,33 120,99 60,132 0,99 0,33'
	};

	vm.points += hex_width/2+',0 ';
	vm.points += hex_width+','+hex_height/4+' ';
	vm.points += hex_width+','+hex_height* 3/4+' ';
	vm.points += hex_width/2+','+hex_height+' ';
	vm.points += '0,'+hex_height* 3/4+' ';
	vm.points += '0,'+hex_height/4;


	// SET POSITION **************************/
	var isOdd = function(num) { return num % 2;};
	var num = '' + data.num,
		row = parseInt(num.charAt(0), 10),
		col = parseInt(num.charAt(1), 10);
	var dx = dx_map;
	dx += isOdd(row) ? (hex_width+marginHex)/2 : 0;
	dx += (col - 1) * (hex_width+marginHex);
	var dy = dy_map;
	dy += (row - 1) * (hex_height * 3/4+marginHex);
	vm.transform = 'translate('+dx+','+dy+')';


	// SET STYLE
	vm.className = 'hex';
	vm.className += data.type === 'head' ? '':' hexagon';

	// SET Faction HEAD Icon
	vm.factionHeadImg = data.type === 'head';
	if(vm.factionHeadImg){
		vm.factionHeadImgWidth = Math.round(hex_width * 0.7);
		vm.factionHeadImgX = 0.5 * (hex_width - vm.factionHeadImgWidth);
		vm.factionHeadImgY = 0.5 * (hex_height - vm.factionHeadImgWidth);
		vm.factionHeadImgHref = 'images/factions/'+data.factionHead+'.png';
	}

	// SET Factory
	vm.factory = data.type === 'factory';

	// PEOPLE
	vm.faction = data.faction;
	vm.peopleFaction = data.faction ? 'people '+data.faction:'';
	if(data.faction){
		vm.worker = data.people.worker;
		vm.mech = data.people.mech;
		vm.character = data.people.character;
	}
	


	vm.onClickAction = function(){
		//log(data.num);
	};



	return vm;
};


viewModelList.push(function() {

	var vm = {

		/*-----------------------*/
		viewName: 'view_map',
		/*-----------------------*/

		current: ko.observable(false),

		txt_continue: _i('Continue'),

		viewBox: '0 0 ' + (9 * (hex_width+marginHex)) + ' ' + (10 * (hex_height+marginHex) * 3/4),
		hexagons: ko.observableArray()
	};

	//var currentPlayer = null;

	// var hexs = [],
	// 	m = 10,
	// 	n = 1;

	// for (var i = 0; i < 72; i++) {
	// 	var o = {
	// 		num: m + n
	// 	};

	// 	var h = hexagonMap(o);
	// 	hexs.push(h);

	// 	n++;
	// 	if (n > 8) {
	// 		n = 1;
	// 		m += 10;
	// 	}
	// }

	if(GAME){
		var hexs = [];
		for(var a in GAME.MAP){
			var d = GAME.MAP[a];
			var h = hexagonMap(d);
			hexs.push(h);
		}
		vm.hexagons(hexs);
	}

	


	vm.continueAction = function() {
		// GAME.advancePlayer();
		// goToView('view_start_turn');
	};

	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
		// if(GAME){
		// 	currentPlayer = GAME.currentPlayer();
		// 	vm.title(_i(capitalize(currentPlayer.factionName)));
		// 	vm.icon('images/factions/' + currentPlayer.factionName + '.png');
		// 	vm.playerName(_i(currentPlayer.name));
		// 	vm.playerIcon(currentPlayer.icon);
		// }
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});