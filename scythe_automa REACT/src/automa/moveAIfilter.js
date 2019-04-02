import {
	cloneObject
} from '../utils';

const selectHexagonsEnemies = function (map, player) {
	let hexagonsEnemies = [];
	for (var a in map) {
		if (map[a].faction !== null && map[a].faction !== player.factionName) {
			hexagonsEnemies.push(map[a]);
		}
	}
	return hexagonsEnemies;
};


const filterMove = (Util, moveAction, player, map, vecHexagons, hexUnit) => {
	let vecHexagonFiltered = [];
	let hexDestiny = null;

	let filter = moveAction.type;
	filter += moveAction.attack ? '_attack' : '';

	const mechOrCharacter_No_attack = function () {

		var yesToBaseHex = [],
			notToBaseHex = [];

		// Select enemies
		const hexagonsEnemies = selectHexagonsEnemies(map, player);

		vecHexagons.forEach(function (vecHex) {
			var el = cloneObject(vecHex);
			if (el.num === hexUnit.num) {
				if (el.people.mech > 0) {
					el.people.mech--;
				}
				if (el.people.character > 0) {
					el.people.character--;
				}
			}
			// if not enemies:
			if (el.faction === null || el.faction === player.factionName) {
				if (el.people.mech === 0 && el.people.character === 0) {
					el.distanceToEnemie = 9999;
					el.toBase = false;

					// Find the closer enemie
					hexagonsEnemies.forEach(function (hexEnem) {
						// if enemies
						if (hexEnem.people.mech > 0 || hexEnem.people.character > 0) {
							var dist = Util.getDistance(hexEnem.num, el.num);
							// is closer
							if (dist <= el.distanceToEnemie) {
								if (dist === el.distanceToEnemie && hexEnem.type !== 'head') {
									el.toBase = false;
								} else {
									el.toBase = hexEnem.type === 'head';
								}
								el.distanceToEnemie = dist;
							}
						}
					});
					if (el.toBase) {
						yesToBaseHex.push(el);
					} else {
						notToBaseHex.push(el);
					}
				}
			}
		});
		vecHexagonFiltered = notToBaseHex.length > 0 ? notToBaseHex : yesToBaseHex;

		// Ordenated to enemie distance (the closer)
		vecHexagonFiltered.sort(function (a, b) {
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
		if (vecHexagonFiltered.length > 0) {
			hexDestiny = map[vecHexagonFiltered[0].num];
		}
	};

	switch (filter) {
		case 'worker':
			vecHexagons.forEach(function (vecHex) {
				var el = cloneObject(vecHex);
				if (el.num === hexUnit.num) {
					el.people.worker--;
				}
				// if not enemies:
				if (el.faction === null || el.faction === player.factionName) {

					el.nearEnemyAttack = 0;

					el.weight = el.people.worker + el.people.mech + el.people.character;

					var elVecs = Util.getVecListForHex(el.num, map);
					elVecs.forEach(function (h) {
						if (map[h].faction !== null) {
							if (map[h].faction === player.factionName) {
								// Add friends to the weight
								el.weight += (map[h].people.worker + map[h].people.mech + map[h].people.character);
								if (h === hexUnit.num) {
									el.weight--;
								}
							} else {
								// Add near Enemies								
								el.nearEnemyAttack += map[h].people.mech + map[h].people.character;
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
			if (vecHexagonFiltered.length > 0) {
				hexDestiny = map[vecHexagonFiltered[0].num];
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
			vecHexagons.forEach(function (vecHex) {
				var el = cloneObject(vecHex);

				// if not enemies:
				if (el.faction === null || el.faction === player.factionName) {
					if (el.people.mech === 0 && el.people.character === 0) {
						// If factory and player hasn't factory card
						if (el.type === 'factory' && !player.board.factoryCard) {
							factoryHex = map[el.num];
						} else {
							// if encounter
							if (el.encounter) {
								vecHexagonFiltered.push(el);
							}
						}
					}
				}
			});
			if (factoryHex) {
				hexDestiny = factoryHex;
			} else {
				// Ordenated to factory distance (the closer)
				vecHexagonFiltered.sort(function (a, b) {
					if (a.distance < b.distance) {
						return -1;
					} else if (a.distance > b.distance) {
						return 1;
					} else {
						return a.num < b.num ? -1 : 1;
					}
				});
				if (vecHexagonFiltered.length > 0) {
					hexDestiny = map[vecHexagonFiltered[0].num];
				}
			}
			break;
		case 'character_or_mech_attack':
			vecHexagons.forEach(function (vecHex) {
				var el = cloneObject(vecHex);

				// if yes enemies:
				if (el.faction !== null && el.faction !== player.factionName) {
					el.enemies = el.people.mech + el.people.character;
					if (el.enemies > 0) {
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
			if (vecHexagonFiltered.length > 0) {
				hexDestiny = map[vecHexagonFiltered[0].num];
			}
			break;
		case 'worker_attack_attack':

			vecHexagons.forEach(function (vecHex) {
				var el = cloneObject(vecHex);

				// if yes enemies:
				if (el.faction !== null && el.faction !== player.factionName) {
					// if not enemies forces:
					if (el.people.mech === 0 && el.people.character === 0 && el.type !== 'head') {
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
			if (vecHexagonFiltered.length > 0) {
				hexDestiny = map[vecHexagonFiltered[0].num];
			}
			break;
		default:
			//
	}
	return hexDestiny;
};

export default filterMove;