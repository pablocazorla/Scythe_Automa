var AUTOMA = (function () {

	var unitTypes = {
			'worker': ['worker'],
			'mech': ['mech'],
			'character': ['character'],
			'encounter_or_factory': ['character'],
			'character_or_mech': ['mech', 'character'],
			'worker_attack': ['mech', 'character'],
		},
		moveAction,
		player,
		moveChoice = null,
		hexagons,
		hexagonsEnemies,
		hexUnit,
		hexDestiny,
		numBase,
		vecHexagons,
		vecHexagonFiltered;

	var selectHexagons = function () {
		hexagons = [];
		for (var a in G.MAP) {
			if (G.MAP[a].faction === player.factionName) {
				hexagons.push(G.MAP[a]);
			}
		}
	};
	var selectHexagonsEnemies = function () {
		hexagonsEnemies = [];
		for (var a in G.MAP) {
			if (G.MAP[a].faction !== null && G.MAP[a].faction !== player.factionName) {
				hexagonsEnemies.push(G.MAP[a]);
			}
		}
	};
	var getDistance = (function () {
		var cache = {};

		return function (num1, num2) {
			if (num1 === num2) {
				return 0;
			} else {
				var n1 = num1 > num2 ? num1 : num2,
					n2 = num1 < num2 ? num1 : num2;
				if (cache[n1 + '-' + n2] !== undefined) {
					return cache[n1 + '-' + n2];
				} else {
					var n = n1,
						n2String = '' + n2,
						row2 = parseInt(n2String.charAt(0), 10),
						col2 = parseInt(n2String.charAt(1), 10);
					var getNear = function () {
						var nString = '' + n,
							row = parseInt(nString.charAt(0), 10),
							col = parseInt(nString.charAt(1), 10),
							nearRow, nearCol;
						if (row2 < row) {
							nearRow = row - 1;
							if (isOdd(row)) {
								if (col2 <= col) {
									nearCol = col;
								} else {
									nearCol = col + 1;
								}
							} else {
								if (col2 >= col) {
									nearCol = col;
								} else {
									nearCol = col - 1;
								}
							}
						} else {
							nearRow = row;
							if (col2 < col) {
								nearCol = col - 1;
							} else if (col2 > col) {
								nearCol = col + 1;
							} else {
								nearCol = col;
							}
						}
						return parseInt(nearRow + '' + nearCol, 10);
					};
					var d = 0;
					while (n !== n2) {
						n = getNear();
						d++;
					}
					cache[n1 + '-' + n2] = d;
					return d;
				}
			}
		};
	})();
	var orderByDistance = function () {
		hexUnit.sort(function (a, b) {
			var dA = getDistance(a.num, numBase);
			var dB = getDistance(b.num, numBase);
			if (dA < dB) {
				return -1;
			} else if (dA > dB) {
				return 1;
			} else {
				return a.num < b.num ? -1 : 1;
			}
		});
		return hexUnit;
	};
	var selectHexUnit = function () {
		hexUnit = [];

		hexagons.forEach(function (h) {
			unitTypes[moveAction.type].forEach(function (opType) {
				if (h.people[opType] > 0) {
					hexUnit.push(h);
				}
			});
		});
		if (hexUnit.length > 0) {
			hexUnit = orderByDistance()[0];
			return hexUnit;
		} else {
			return null;
		}
	};
	var getVecListForHex = function (hex_num) {
		var nString = '' + hex_num,
			row = parseInt(nString.charAt(0), 10),
			hexVecsNum = isOdd(row) ? [
				hex_num - 10,
				hex_num - 9,
				hex_num - 1,
				hex_num + 1,
				hex_num + 10,
				hex_num + 11
			] : [
				hex_num - 11,
				hex_num - 10,
				hex_num - 1,
				hex_num + 1,
				hex_num + 9,
				hex_num + 10
			],
			hexVecs = [];

		hexVecsNum.forEach(function (h) {
			if (G.MAP[h] !== undefined) {
				hexVecs.push(h);
			}
		});

		return hexVecs;
	};
	var selectVecHexagons = function () {
		vecHexagons = [];
		var vecHexNumbers = {};			

		hexagons.forEach(function (hex) {
			var vecHex = getVecListForHex(hex.num);
			vecHexNumbers[hex.num] = true;
			vecHex.forEach(function (h) {
				vecHexNumbers[h] = true;
			});
		});

		for(var n in vecHexNumbers){
			vecHexagons.push(G.MAP[n]);
		}		
	};
	var filterVecHexagonsByMoveType = function (){

		vecHexagonFiltered = [];
		hexDestiny = null;

		var filter = moveAction.type;
		filter += moveAction.attack ? '_attack' : '';


		var mechOrCharacter_No_attack = function(){

			var yesToBaseHex = [],
				notToBaseHex = [];

			// Select enemies
			selectHexagonsEnemies();

			vecHexagons.forEach(function(vecHex){
				var el = cloneObject(vecHex);
				if (el.num === hexUnit.num) {
					if(el.people.mech > 0){
						el.people.mech--;
					}
					if(el.people.character > 0){
						el.people.character--;
					}
				}
				// if not enemies:
				if (el.faction === null || el.faction === player.factionName) {
					if(el.people.mech === 0 && el.people.character === 0){
						el.distanceToEnemie = 9999;
						el.toBase = false;

						// Find the closer enemie
						hexagonsEnemies.forEach(function(hexEnem){
							// if enemies
							if(hexEnem.people.mech > 0 || hexEnem.people.character > 0 ){
								var dist = getDistance(hexEnem.num,el.num);
								// is closer
								if(dist <= el.distanceToEnemie){
									if(dist === el.distanceToEnemie && hexEnem.type !== 'head'){
										el.toBase = false;
									}else{										
										el.toBase = hexEnem.type === 'head';
									}
									el.distanceToEnemie = dist;
								}
							}
						});
						if(el.toBase){
							yesToBaseHex.push(el);
						}else{
							notToBaseHex.push(el);
						}
					}
				}
			});
			vecHexagonFiltered = notToBaseHex.length > 0 ? notToBaseHex : yesToBaseHex;

			// Ordenated to enemie distance (the closer)
			vecHexagonFiltered.sort(function(a, b){
				var wA = a.distanceToEnemie,
						wB = b.distanceToEnemie;
						if (wA < wB) {
							return -1;
						} else if (wA > wB) {
							return 1;
						} else {
							if (a.distance < b.distance) {
								return -1;
							} else if (a.distance > b.distance) {
								return 1;
							} else {
								return a.num < b.num ? -1 : 1;
							}
						}
			});
			if(vecHexagonFiltered.length > 0){
				hexDestiny = G.MAP[vecHexagonFiltered[0].num];
			}
		};

		switch(filter){
			case 'worker':
				vecHexagons.forEach(function(vecHex){
					var el = cloneObject(vecHex);

					if (el.num === hexUnit.num) {
						el.people.worker--;
					}

					// if not enemies:
					if (el.faction === null || el.faction === player.factionName) {
					
						el.nearEnemyAttack = 0;

						el.weight = el.people.worker + el.people.mech + el.people.character;

						var elVecs = getVecListForHex(el.num);
						elVecs.forEach(function (h) {
							if (G.MAP[h].faction !== null) {
								if (G.MAP[h].faction === player.factionName) {
									// Add friends to the weight
									el.weight += (G.MAP[h].people.worker + G.MAP[h].people.mech + G.MAP[h].people.character);
									if (h === hexUnit.num) {
										el.weight--;
									}
								} else {
									// Add near Enemies								
									el.nearEnemyAttack += G.MAP[h].people.mech + G.MAP[h].people.character;
								}
							}
						});
						// If not near Enemies						
						if (el.nearEnemyAttack === 0) {
							delete el.nearEnemyAttack;
							// If not workers
							if (el.people.worker === 0) {
								vecHexagonFiltered.push(el);
							}
						}						
					}
				});

				// Ordenated to weight
				vecHexagonFiltered.sort(function (a, b) {
					var wA = a.weight || 0,
						wB = b.weight || 0;
					if (wA > wB) {
						return -1;
					} else if (wA < wB) {
						return 1;
					} else {
						if (a.distance < b.distance) {
							return -1;
						} else if (a.distance > b.distance) {
							return 1;
						} else {
							return a.num < b.num ? -1 : 1;
						}
					}
				});
				if(vecHexagonFiltered.length > 0){
					hexDestiny = G.MAP[vecHexagonFiltered[0].num];
				}
				break;
			case 'mech':
				mechOrCharacter_No_attack();
				break;
			case 'character':
				mechOrCharacter_No_attack();
				break;
			case 'encounter_or_factory':
				var factoryHex = false;
				vecHexagons.forEach(function(vecHex){
					var el = cloneObject(vecHex);

					// if not enemies:
					if (el.faction === null || el.faction === player.factionName) {
						if(el.people.mech === 0 && el.people.character === 0){
							// If factory and player hasn't factory card
							if(el.type === 'factory' && !player.board.factoryCard){
								factoryHex = G.MAP[el.num];
							}else{
								// if encounter
								if(el.encounter){
									vecHexagonFiltered.push(el);
								}
							}
						}
					}
				});
				if(factoryHex){
					hexDestiny = factoryHex;
				}else{
					// Ordenated to factory distance (the closer)
					vecHexagonFiltered.sort(function(a, b){				
						if (a.distance < b.distance) {
							return -1;
						} else if (a.distance > b.distance) {
							return 1;
						} else {
							return a.num < b.num ? -1 : 1;
						}								
					});
					if(vecHexagonFiltered.length > 0){
						hexDestiny = G.MAP[vecHexagonFiltered[0].num];
					}
				}
				break;
			case 'character_or_mech_attack':
				vecHexagons.forEach(function(vecHex){
					var el = cloneObject(vecHex);

					// if yes enemies:
					if (el.faction !== null && el.faction !== player.factionName) {
						el.enemies = el.people.mech + el.people.character;
						if(el.enemies > 0){
							vecHexagonFiltered.push(el);
						}
					}
				});
				
				// Ordenated by enemies
				vecHexagonFiltered.sort(function (a, b) {
					var wA = a.enemies || 0,
						wB = b.enemies || 0;
					if (wA < wB) {
						return -1;
					} else if (wA > wB) {
						return 1;
					} else {
						if (a.distance < b.distance) {
							return -1;
						} else if (a.distance > b.distance) {
							return 1;
						} else {
							return a.num < b.num ? -1 : 1;
						}
					}
				});
				if(vecHexagonFiltered.length > 0){
					hexDestiny = G.MAP[vecHexagonFiltered[0].num];
				}
				break;
			case 'worker_attack_attack':
				vecHexagons.forEach(function(vecHex){
					var el = cloneObject(vecHex);
					// if yes enemies:
					if (el.faction !== null && el.faction !== player.factionName) {
						// if not enemies forces:
						if(el.people.mech === 0 && el.people.character === 0 && el.type !== 'head'){
							vecHexagonFiltered.push(el);
							
						}
					}
				});
				// Ordenated by most workers
				vecHexagonFiltered.sort(function (a, b) {
					var wA = a.people.worker,
						wB = b.people.worker;
					if (wA > wB) {
						return -1;
					} else if (wA < wB) {
						return 1;
					} else {
						if (a.distance < b.distance) {
							return -1;
						} else if (a.distance > b.distance) {
							return 1;
						} else {
							return a.num < b.num ? -1 : 1;
						}
					}
				});
				if(vecHexagonFiltered.length > 0){
					hexDestiny = G.MAP[vecHexagonFiltered[0].num];
				}
				break;
			default:
				//
		}
	};
	var setTypeToMove = function(){
		var unitToMove = null;
		unitTypes[moveAction.type].forEach(function(unit){
			if(!unitToMove){
				if(hexUnit.people[unit] > 0){
					unitToMove = unit;
				}
			}
		});
		return unitToMove;
	};

	var AI = {
		move: function (ma, pl) {
			moveChoice = null;
			hexUnit = null;
			hexDestiny = null;

			moveAction = ma;
			player = pl;
			numBase = G.getBaseMapIndex(pl.factionName);			

			selectHexagons();
			selectHexUnit();
			if (hexUnit) {
				selectVecHexagons();
				filterVecHexagonsByMoveType();
			}
			if(hexUnit && hexDestiny){
				if(hexUnit.num !== hexDestiny.num){
					moveChoice = {
						origin:hexUnit,
						destiny:hexDestiny,
						type: setTypeToMove()
					}
				}
			}
			return moveChoice;
		}
	};
	return AI;
})();