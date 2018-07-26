/* VIEW: MAP *****************************/

/* Human Data for map */
var mapHumanAction = 'move',
	mapHumanElement = 'worker',
	mapHumanMoveElement = ko.observable(null),
	mapHumanRollBackElement = ko.observable(null),
	mapHumanChanges = ko.observable(null);
/* end Human Data for map */

/* Hexagon Map VM */
var hexagonMap = function (data) {
	var num = '' + data.num,
		row = parseInt(num.charAt(0), 10),
		col = parseInt(num.charAt(1), 10),
		dx = 65 + (isOdd(row) ? 60 : 0) + (120 * (col - 1)),
		dy = 30 + (99 * (row - 1));

	var vm = {
		num: data.num,
		distance: data.distance,
		withEnemies: ko.observable(false),
		attack: null,
		encounter: data.encounter,

		// Faction
		faction: ko.observable(data.faction),
		peopleFactionClass: ko.observable(data.faction ? 'people ' + data.faction : ''),

		// DRAW
		points: SVG.hexagon.points,
		workerPoints: SVG.worker.points,
		mechPoints: SVG.mech.points,
		characterPoints: SVG.character.points,
		factoryPoints: SVG.factory.points,
		attackPoints1: SVG.attack.points1,
		attackPoints2: SVG.attack.points2,

		transform: 'translate(' + dx + ',' + dy + ')',
		className: 'hex' + (data.type === 'head' ? '' : ' hexagon'),
		factionHeadImg: data.type === 'head',
		factionHeadImgWidth: 84,
		factionHeadImgX: 18,
		factionHeadImgY: 18,
		factionHeadImgHref: 'images/factions/' + (data.factionHead || '') + '.png',
		factory: data.type === 'factory',

		// PEOPLE
		worker: ko.observable(data.people.worker),
		mech: ko.observable(data.people.mech),
		character: ko.observable(data.people.character)
	};

	/* HUMAN ACTIONS */
	var addElement = function (element) {
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
					if (!vm.factionHeadImg) {
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
					} else {
						// Roll back item
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
		},
		quitElement = function (elementName) {
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
			if (poblation === 0 && !vm.factionHeadImg) {
				vm.faction(null);
			}
			var mhCh = mapHumanChanges();
			if (!mhCh) {
				mhCh = {};
			}
			mhCh[vm.num] = true;
			mapHumanChanges(mhCh);
		};
	vm.onClickHexagon = function () {
		if (!currentPlayer.ai) {
			if (mapHumanAction === 'move') {
				// MOVE
				var element = mapHumanMoveElement();
				if (element) {
					// Add element
					addElement(element);
				} else {
					if (currentPlayer.factionName === vm.faction()) {
						var el = vm[mapHumanElement]();
						if (el > 0) {
							quitElement(mapHumanElement);
						}
					}
				}
			} else {
				// ADD
				var fact = vm.faction();
				if (currentPlayer.factionName === fact || fact === null) {
					var element = {
						type: mapHumanElement,
						faction: currentPlayer.factionName
					};
					addElement(element);
				}
			}
		}
	};
	/* end HUMAN ACTIONS */

	return vm;
};

/* View Map */
viewModelList.push(function () {
	var mapCursorMove = false;
	var vm = {
		/*-----------------------*/
		viewName: 'view_map',
		/*-----------------------*/
		current: ko.observable(false),

		// draw
		workerPoints: SVG.worker.points,
		mechPoints: SVG.mech.points,
		characterPoints: SVG.character.points,		
		viewBox: '0 0 1080 990',

		// human
		hexagons: ko.observableArray(),
		addAction: ko.observable(false),
		currentFaction: ko.observable(false),
		mapCursorVisible: ko.observable(false),
		mapCursorMech: ko.observable(false),
		mapCursorWorker: ko.observable(false),
		mapCursorCharacter: ko.observable(false),
		undoChangesEnabled: ko.observable(false),
		isAddAction: ko.observable(false),
		selectedUnit: ko.observable('worker'),
		disabledCharacter: ko.observable(false),

		// text
		txt_lead_1: _i('Move your pieces by selecting in map'),
		txt_lead_2: _i('or add new pieces'),
		txt_continue: _i('Continue'),
		txt_add: _i('Add'),
		txt_move: _i('Move'),
	};

	var resetMap = function () {
		if (GAME) {
			/* Human Data for map */
			mapHumanAction = 'move';
			mapHumanElement = 'worker';
			mapHumanChanges(null);
			mapHumanMoveElement(null);
			mapHumanRollBackElement(null);
			// human
			vm.isAddAction(false);
			vm.selectedUnit('worker');
			vm.currentFaction(currentPlayer.factionName);

			// create hexagons
			var hexs = [];
			for (var a in GAME.MAP) {
				var d = GAME.MAP[a];
				var h = hexagonMap(d);
				hexs.push(h);
			}
			vm.hexagons(hexs);
		}
	};

	// Human actions
	vm.selectWorker = function () {
		mapHumanElement = 'worker';
		vm.selectedUnit(mapHumanElement);
	};
	vm.selectMech = function () {
		mapHumanElement = 'mech';
		vm.selectedUnit(mapHumanElement);
	};
	vm.selectCharacter = function () {
		if (mapHumanAction === 'move') {
			mapHumanElement = 'character';
			vm.selectedUnit(mapHumanElement);
		}
	};
	vm.undoChanges = function () {
		if (vm.undoChangesEnabled()) {
			resetMap();
		}
	};
	vm.toggleAction = function () {
		var v = !vm.isAddAction();
		vm.isAddAction(v);
		mapHumanAction = v ? 'add' : 'move';
		if (mapHumanAction === 'add' && mapHumanElement === 'character') {
			mapHumanElement = 'worker';
			vm.selectedUnit(mapHumanElement);
		}
		vm.disabledCharacter(mapHumanAction === 'add');
	};

	// Continue
	vm.continueAction = function () {
		if (!mapHumanMoveElement()) {
			var hexs = vm.hexagons();

			if (!currentPlayer.ai) {
				// Save Human changes
				var mhCh = mapHumanChanges();
				if (!mhCh) {
					mhCh = {};
				}
				hexs.forEach(function (hex) {
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
			}else{
				// Save AI changes ?

			}
			// Reset status
			mapHumanChanges(null);
			mapHumanMoveElement(null);
			mapHumanRollBackElement(null);
			mapCursorMove = false;

			// CONTINUE
			GAME.hexConflict = GAME.evaluateAttack();
			
			if (GAME.hexConflict.workers.length > 0) {
				// Attack workers
				goToView('view_attack_worker');
			} else {
				if (GAME.hexConflict.war) {
					goToView('view_war');
				} else {
					var hexEncounter = GAME.evaluateEncounter();
					if(hexEncounter){
						// Encounter
						goToView('view_encounter');
					}else{
						if(!currentPlayer.ai){
							//continue to human start
							goToView('view_human_start');
						}else{
							// continue to evaluate AI resources
						}
					}
				}
			}
		};
	};

	/* SUBSCRIPTIONS */
	mapHumanMoveElement.subscribe(function (v) {
		var isMoving = v !== null;
		vm.mapCursorVisible(isMoving);
		mapCursorMove = isMoving;
		if (isMoving) {
			vm.mapCursorMech(v.type === 'mech');
			vm.mapCursorWorker(v.type === 'worker');
			vm.mapCursorCharacter(v.type === 'character');
		}
	});
	mapHumanRollBackElement.subscribe(function (v) {
		if (v !== null) {
			var hexs = vm.hexagons(),
				change = false;
			hexs.forEach(function (h) {
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
	mapHumanChanges.subscribe(function (v) {
		vm.undoChangesEnabled(!(v === null));
	});

	/* EVENT WINDOWS */
	var view_map = document.getElementById('view_map');
	var mapCursor = document.getElementById('map-cursor');
	window.addEventListener('mousedown', function (e) {
		var x = e.pageX - view_map.getBoundingClientRect().left - 16,
			y = e.pageY - 16;
		mapCursor.style = 'top:' + y + 'px;left:' + x + 'px';
	});
	window.addEventListener('mousemove', function (e) {
		if (mapCursorMove) {
			var x = e.pageX - view_map.getBoundingClientRect().left - 16,
				y = e.pageY - 16;
			mapCursor.style = 'top:' + y + 'px;left:' + x + 'px';
		}
	});


	/* VIEW SUBSCRIPTION */
	currentView.subscribe(function (newValue) {
		vm.current(newValue === vm.viewName);
		if (newValue === vm.viewName) {
			resetMap();
		}
	});
	ko.applyBindings(vm, document.getElementById(vm.viewName));
	return vm;
});
/* end VIEW: MAP *****************************/