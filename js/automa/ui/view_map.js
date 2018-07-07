var mapConfig = {
	hex_width: 120,
	hex_height: 132,
	dx_map: 65,
	dy_map: 30,
	marginHex: 0
};

var mapForHuman = false;
var mapHumanMoveElement = ko.observable(null);
var mapHumanRollBackElement = ko.observable(null);
var mapCurrentPlayer = null;
var mapHumanChanges = ko.observable(null);

var hexagonMap = function(data) {
	var vm = {
		num: data.num,
		// Faction
		faction: ko.observable(data.faction),
		peopleFactionClass: ko.observable(data.faction ? 'people ' + data.faction : ''),

		// PEOPLE
		worker: ko.observable(data.people.worker),
		mech: ko.observable(data.people.mech),
		character: ko.observable(data.people.character),

		withEnemies: ko.observable(false),
		attack: null
	};


	// DRAW **************************/
	var draw = function() {
		vm.points = '';
		vm.points += mapConfig.hex_width / 2 + ',0 ';
		vm.points += mapConfig.hex_width + ',' + mapConfig.hex_height / 4 + ' ';
		vm.points += mapConfig.hex_width + ',' + mapConfig.hex_height * 3 / 4 + ' ';
		vm.points += mapConfig.hex_width / 2 + ',' + mapConfig.hex_height + ' ';
		vm.points += '0,' + mapConfig.hex_height * 3 / 4 + ' ';
		vm.points += '0,' + mapConfig.hex_height / 4;
		var isOdd = function(num) {
			return num % 2;
		};
		var num = '' + data.num,
			row = parseInt(num.charAt(0), 10),
			col = parseInt(num.charAt(1), 10);
		var dx = mapConfig.dx_map;
		dx += isOdd(row) ? (mapConfig.hex_width + mapConfig.marginHex) / 2 : 0;
		dx += (col - 1) * (mapConfig.hex_width + mapConfig.marginHex);
		var dy = mapConfig.dy_map;
		dy += (row - 1) * (mapConfig.hex_height * 3 / 4 + mapConfig.marginHex);
		vm.transform = 'translate(' + dx + ',' + dy + ')';
		// set style
		vm.className = 'hex';
		vm.className += data.type === 'head' ? '' : ' hexagon';
		// set Faction head icon
		vm.factionHeadImg = data.type === 'head';
		if (vm.factionHeadImg) {
			vm.factionHeadImgWidth = Math.round(mapConfig.hex_width * 0.7);
			vm.factionHeadImgX = 0.5 * (mapConfig.hex_width - vm.factionHeadImgWidth);
			vm.factionHeadImgY = 0.5 * (mapConfig.hex_height - vm.factionHeadImgWidth);
			vm.factionHeadImgHref = 'images/factions/' + data.factionHead + '.png';
		}
		// set Factory
		vm.factory = data.type === 'factory';
	};
	draw();
	// END DRAW **************************/


	var addElement = function(element) {
		var currentfaction = vm.faction();
		if (currentfaction === null) {
			vm.faction(element.faction);
			vm.peopleFactionClass('people ' + element.faction);
			var num = vm[element.type]();
			num++;
			vm[element.type](num);
		} else {
			if (currentfaction === element.faction) {
				var num = vm[element.type]();
				num++;
				vm[element.type](num);
			} else {
				// Attack
				if (element.type !== 'worker') {
					vm.withEnemies(true);
					if (!vm.attack) {
						vm.attack = {
							faction: element.faction
						};
					}
					if (!vm.attack[element.type]) {
						vm.attack[element.type] = 1;
					} else {
						vm.attack[element.type] += 1;
					}
				} else {
					// Roll back worker
					mapHumanRollBackElement(element);
				}
			}
		}
		mapHumanMoveElement(null);
		var mhCh = mapHumanChanges();
		if (!mhCh) {
			mhCh = {};
		}
		mhCh[vm.num] = true;
		mapHumanChanges(mhCh);
	};
	var quitElement = function(elementName) {
		mapHumanMoveElement({
			'type': elementName,
			'faction': vm.faction(),
			'from': data.num
		});
		var num = vm[elementName]();
		num = num < 1 ? 0 : num - 1;
		vm[elementName](num);

		// if hex is empty
		var poblation = vm.worker() + vm.mech() + vm.character();
		if (poblation === 0) {
			vm.faction(null);
		}
		var mhCh = mapHumanChanges();
		if (!mhCh) {
			mhCh = {};
		}
		mhCh[vm.num] = true;
		mapHumanChanges(mhCh);
	};



	vm.onClickHexagon = function() {
		var element = mapHumanMoveElement();
		if (mapForHuman && element) {
			// Add element
			addElement(element);
		}
	};
	vm.onClickWorker = function() {
		if (mapForHuman && mapCurrentPlayer.factionName === vm.faction()) {
			var element = mapHumanMoveElement();
			if (element) {
				// Add element
				addElement(element);
			} else {
				// Quit element
				quitElement('worker');
			}
		}
	};
	vm.onClickMech = function() {
		if (mapForHuman && mapCurrentPlayer.factionName === vm.faction()) {
			var element = mapHumanMoveElement();
			if (element) {
				// Add element
				addElement(element);
			} else {
				// Quit element
				quitElement('mech');
			}
		}
	};
	vm.onClickCharacter = function() {
		if (mapForHuman && mapCurrentPlayer.factionName === vm.faction()) {
			if (mapForHuman) {
				var element = mapHumanMoveElement();
				if (element) {
					// Add element
					addElement(element);
				} else {
					// Quit element
					quitElement('character');
				}
			}
		}
	};



	return vm;
};


viewModelList.push(function() {

	var mapCursorMove = false;

	var vm = {
		/*-----------------------*/
		viewName: 'view_map',
		/*-----------------------*/

		current: ko.observable(false),
		txt_lead_1: _i('Move your pieces by selecting in map'),
		txt_lead_2: _i('or add new pieces'),
		txt_continue: _i('Continue'),
		txt_add: _i('Add'),
		viewBox: '0 0 ' + (9 * (mapConfig.hex_width + mapConfig.marginHex)) + ' ' + (10 * (mapConfig.hex_height + mapConfig.marginHex) * 3 / 4),
		hexagons: ko.observableArray(),
		addAction: ko.observable(false),
		currentFaction: ko.observable(false),
		mapCursorVisible: ko.observable(false),
		mapCursorMech: ko.observable(false),
		mapCursorWorker: ko.observable(false),
		mapCursorCharacter: ko.observable(false),
		undoChangesEnabled: ko.observable(false)
	};

	var resetMap = function() {
		if (GAME) {
			mapCurrentPlayer = GAME.currentPlayer();
			mapHumanChanges(null);
			mapHumanMoveElement(null);
			mapHumanRollBackElement(null);

			mapForHuman = !mapCurrentPlayer.ai;
			vm.currentFaction(mapCurrentPlayer.factionName);
			var hexs = [];
			for (var a in GAME.MAP) {
				var d = GAME.MAP[a];
				var h = hexagonMap(d);
				hexs.push(h);
			}
			vm.hexagons(hexs);
		}
	};

	vm.addMech = function() {
		if (!mapHumanMoveElement()) {
			mapHumanMoveElement({
				'type': 'mech',
				'faction': vm.currentFaction()
			});
		}
	};
	vm.addWorker = function() {
		if (!mapHumanMoveElement()) {
			mapHumanMoveElement({
				'type': 'worker',
				'faction': vm.currentFaction()
			});
		}
	};

	vm.undoChanges = function() {
		if (vm.undoChangesEnabled()) {
			resetMap();
		}
	};

	vm.continueAction = function() {
		if (!mapHumanMoveElement()) {
			var hexs = vm.hexagons();
			var changes = [];

			var mhCh = mapHumanChanges();
			if (!mhCh) {
				mhCh = {};
			}
			hexs.forEach(function(hex) {
				if (mhCh[hex.num]) {
					var o = {
						'people': {
							'worker': hex.worker(),
							'mech': hex.mech(),
							'character': hex.character()
						},
						'faction': hex.faction()
					};

					if (hex.attack) {
						o.attack = cloneObject(hex.attack);
					}

					GAME.MAP[hex.num] = extendObject(GAME.MAP[hex.num], o);
				}
			});
			// Reset status
			mapHumanChanges(null);
			mapHumanMoveElement(null);
			mapHumanRollBackElement(null);
			mapCursorMove = false;
		};
	};


	/* SUBSCRIPTIONS */

	mapHumanMoveElement.subscribe(function(v) {
		var isMoving = v !== null;
		vm.mapCursorVisible(isMoving);
		mapCursorMove = isMoving;
		if (isMoving) {
			vm.mapCursorMech(v.type === 'mech');
			vm.mapCursorWorker(v.type === 'worker');
			vm.mapCursorCharacter(v.type === 'character');
		}
	});
	mapHumanRollBackElement.subscribe(function(v) {
		if (v !== null) {
			var hexs = vm.hexagons(),
				change = false;
			hexs.forEach(function(h) {
				if (h.num === v.from) {
					var p = h[v.type]();
					h[v.type](p + 1);
					h.faction(v.faction);
					change = true;
				}
			});
			if (change) {
				vm.hexagons(hexs);
			}
			mapHumanRollBackElement(null);
		}
	});
	mapHumanChanges.subscribe(function(v) {
		vm.undoChangesEnabled(!(v === null));
	});

	/* EVENT WINDOWS */
	var view_map = document.getElementById('view_map');
	var mapCursor = document.getElementById('map-cursor');
	window.addEventListener('mousedown', function(e) {
		var x = e.pageX - view_map.getBoundingClientRect().left - 16,
			y = e.pageY - 16;
		mapCursor.style = 'top:' + y + 'px;left:' + x + 'px';
	});
	window.addEventListener('mousemove', function(e) {
		if (mapCursorMove) {
			var x = e.pageX - view_map.getBoundingClientRect().left - 16,
				y = e.pageY - 16;
			mapCursor.style = 'top:' + y + 'px;left:' + x + 'px';
		}
	});


	/* VIEW SUBSCRIPTION */
	currentView.subscribe(function(newValue) {
		vm.current(newValue === vm.viewName);
		resetMap();
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});