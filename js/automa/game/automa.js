var ai = {};

ai.getDistance = (function () {
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
ai.getHexOfPlayer = function (player) {
	var hexs = [];
	for (var a in G.MAP) {
		if (G.MAP[a].faction === player.factionName) {
			hexs.push(G.MAP[a]);
		}
	}
	return hexs;
};
ai.orderHexsByDistance = function (hexagons, numBase) {
	hexagons.sort(function (a, b) {
		var dA = ai.getDistance(a.num, numBase);
		var dB = ai.getDistance(b.num, numBase);
		if (dA < dB) {
			return -1;
		} else if (dA > dB) {
			return 1;
		} else {
			return a.num < b.num ? -1 : 1;
		}
	});
	return hexagons;
};
ai.filterByUnit = function (hexagons, unit, numBase) {
	var hexs = [];

	hexagons.forEach(function (h) {
		if (h.people[unit] > 0) {
			hexs.push(h);
		}
	});
	if (hexs.length > 0) {
		hexs = ai.orderHexsByDistance(hexs, numBase);
	}


	return hexs;
};
ai.getVecs = function (hexagons, faction, origin, filter) {
	var o = {},
		getVecListForHex = function (hex_num) {
			var hexVecsNum,
				hexVecs = [];
			var nString = '' + hex_num,
				row = parseInt(nString.charAt(0), 10);
			if (isOdd(row)) {
				hexVecsNum = [
					hex_num - 10,
					hex_num - 9,
					hex_num - 1,
					hex_num + 1,
					hex_num + 10,
					hex_num + 11
				];
			} else {
				hexVecsNum = [
					hex_num - 11,
					hex_num - 10,
					hex_num - 1,
					hex_num + 1,
					hex_num + 9,
					hex_num + 10
				];
			}
			hexVecsNum.forEach(function (h) {
				if (G.MAP[h] !== undefined) {
					hexVecs.push(h);
				}
			});
			return hexVecs;
		};

	hexagons.forEach(function (hex) {
		var vecHex = getVecListForHex(hex.num);
		o[hex.num] = true;
		vecHex.forEach(function (h) {
			o[h] = true;
		});
	});

	var vecs = [];

	switch (filter) {
		case 'worker':
			for (var astr in o) {

				var a = parseInt(astr, 10);

				var el = {
					num: a,
					faction: G.MAP[a].faction,
					people: cloneObject(G.MAP[a].people),
					distance: G.MAP[a].distance
				};

				if (a === origin.hexNum) {
					el.people[origin.unit]--;
				}

				if (G.MAP[a].faction === null || G.MAP[a].faction === faction) {
					el.nearEnemyWorker = 0;
					el.nearEnemyAttack = 0;

					el.weight = G.MAP[a].people.worker + G.MAP[a].people.mech + G.MAP[a].people.character;

					if (a === origin.hexNum) {
						el.weight--;
					}

					var vecHex = getVecListForHex(a);
					vecHex.forEach(function (h) {
						if (G.MAP[h].faction !== null) {
							if (G.MAP[h].faction === faction) {
								el.weight += (G.MAP[h].people.worker + G.MAP[h].people.mech + G.MAP[h].people.character);
								if (h === origin.hexNum) {
									el.weight--;
								}
							} else {
								el.nearEnemyWorker += G.MAP[h].people.worker;
								el.nearEnemyAttack += G.MAP[h].people.mech + G.MAP[h].people.character;
							}
						}
					});

					if (el.nearEnemyWorker === 0) {
						delete el.nearEnemyWorker;
					}
					if (el.nearEnemyAttack === 0) {
						delete el.nearEnemyAttack;
					}
				} else {
					// Enemies			
				}
				vecs.push(el);
			};
			vecs.sort(function (a, b) {
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
			break;
		case 'mech':
			//Get all enemies
			var enemyHex = [];
			for(var a in G.MAP){
				if (G.MAP[a].faction !== null && G.MAP[a].faction !== faction){
					if (G.MAP[a].people.mech > 0 || G.MAP[a].people.character > 0){
						enemyHex.push(G.MAP[a]);
					}
				}
			}
			// create collection
			for (var astr in o){
				var a = parseInt(astr, 10);

				var el = {
					num: a,
					faction: G.MAP[a].faction,
					distance: G.MAP[a].distance
				};
				if (G.MAP[a].faction === null || G.MAP[a].faction === faction) {
					var distanceToEnemy = 9999;
					enemyHex.forEach(function(enem){
						var dist = ai.getDistance(enem.num,a);
						if (dist < distanceToEnemy){
							distanceToEnemy = dist;
						}
					});
					el.distanceToEnemy = distanceToEnemy;
				}
				vecs.push(el);
			}
			log('vecs', vecs);

			break;
		default:
		//
	};
	return vecs;
};


ai.worker = function (player) {
	var m = null;

	var baseNum = G.getBaseMapIndex(player.factionName);

	var hexs = ai.getHexOfPlayer(player),
		hexWorkers = ai.filterByUnit(hexs, 'worker', baseNum);

	if (hexWorkers.length > 0) {
		// The worker chosen is:
		m = {
			origin: {
				unit: 'worker',
				hexNum: hexWorkers[0].num
			},
			destiny: {
				hexNum: null
			}
		};

		var vecs = ai.getVecs(hexs, player.factionName, m.origin, 'worker');

		var choosen = false;

		vecs.forEach(function (h) {
			if (!choosen) {
				if (h.faction === null || h.faction === player.factionName) {
					if (h.people.worker === 0) {
						if (!h.nearEnemyAttack) {
							if (m.origin.hexNum !== h.num) {
								m.destiny.hexNum = h.num;
								choosen = true;
							}
						}
					}
				}
			}
		});

		if (!choosen) {
			m = null;
		}
	}
	return m;
};

ai.mech = function (player) {
	var m = null;

	var baseNum = G.getBaseMapIndex(player.factionName);

	var hexs = ai.getHexOfPlayer(player),
		hexMechs = ai.filterByUnit(hexs, 'mech', baseNum);

	//log('hexMechs', hexMechs);

	if (hexMechs.length > 0) {
		// The worker chosen is:
		m = {
			origin: {
				unit: 'mech',
				hexNum: hexMechs[0].num
			},
			destiny: {
				hexNum: null
			}
		};

		var vecs = ai.getVecs(hexs, player.factionName, m.origin,'mech');

		log(vecs);

		// var choosen = false;

		// vecs.forEach(function (h) {
		// 	if (!choosen) {
		// 		if (h.faction === null || h.faction === player.factionName) {
		// 			if (h.people.worker === 0) {
		// 				if (!h.nearEnemyAttack) {
		// 					m.destiny.hexNum = h.num;
		// 					choosen = true;
		// 				}
		// 			}
		// 		}
		// 	}
		// });
		log('m', m);
	}
	return m;
};

G.evaluateAI = function (player) {
	//	log('player', player);

	var card = getCard();

	var moves = card['e' + player.strategy].move;

	var moveChoice = null;

	moves.forEach(function (m) {
		if (!moveChoice) {
			var validFaction = m.faction ? m.faction === player.factionName : true;
			if (validFaction) {
				switch (m.type) {
					case 'worker':
						moveChoice = ai.worker(player);
						break;
					case 'mech':
						moveChoice = ai.mech(player);
						break;
					default:
					//
				}
			}
		}
	});

	log('moveChoice', moveChoice);

	// var vecs = getVecs(player);
	// log('vecs', vecs);
	// Evaluate move


};