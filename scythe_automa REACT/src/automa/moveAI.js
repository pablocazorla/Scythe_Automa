import {
	isOdd
} from '../utils';
import {
	getBaseNumByFaction,
	notCrossRiverHexNum
} from '../config/map';
import moveAIfilter from './moveAIfilter';


const Util = {
	unitTypes: {
		'worker': ['worker'],
		'mech': ['mech'],
		'character': ['character'],
		'encounter_or_factory': ['character'],
		'character_or_mech': ['mech', 'character'],
		'worker_attack': ['mech', 'character'],
	},
	getDistance: (function () {
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
	})(),
	orderByDistance: (hexagonsWithUnit, player) => {
		const numBase = getBaseNumByFaction(player.factionName);
		hexagonsWithUnit.sort(function (a, b) {
			var dA = Util.getDistance(a.num, numBase);
			var dB = Util.getDistance(b.num, numBase);
			if (dA < dB) {
				return -1;
			} else if (dA > dB) {
				return 1;
			} else {
				return a.num < b.num ? -1 : 1;
			}
		});
		return hexagonsWithUnit;
	},
	getVecListForHex: (hex_num, map) => {
		let nString = '' + hex_num,
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
			if (map[h] !== undefined) {
				hexVecs.push(h);
			}
		});

		return hexVecs;
	}
};


const selectOwnHexagons = (map, player) => {
	let hexagons = [];
	for (var a in map) {
		if (map[a].faction === player.factionName) {
			hexagons.push(map[a]);
		}
	}
	return hexagons;
};

const selectHexagonsWithUnit = (ownHexagons, moveAction, player) => {
	let hexagonsWithUnit = [];

	ownHexagons.forEach(function (h) {
		Util.unitTypes[moveAction.type].forEach(function (opType) {
			if (h.people[opType] > 0) {
				hexagonsWithUnit.push(h);
			}
		});
	});
	if (hexagonsWithUnit.length > 0) {
		hexagonsWithUnit = Util.orderByDistance(hexagonsWithUnit, player)[0];
		return hexagonsWithUnit;
	} else {
		return null;
	}
};
const selectVecHexagons = (ownHexagons, player, map) => {
	let vecHexagons = [];
	let vecHexNumbers = {};

	ownHexagons.forEach(function (hex) {
		var vecHex = Util.getVecListForHex(hex.num, map);

		vecHexNumbers[hex.num] = true;
		vecHex.forEach(function (h) {
			if (player.crossRiver) {
				vecHexNumbers[h] = true;
			} else {
				if (notCrossRiverHexNum[player.factionName].indexOf('' + h) >= 0) {
					vecHexNumbers[h] = true;
				}
			}
		});
	});

	for (var n in vecHexNumbers) {
		vecHexagons.push(map[n]);
	}
	return vecHexagons;
};
const setTypeToMove = function (moveAction, hexUnit) {
	var unitToMove = null;
	Util.unitTypes[moveAction.type].forEach(function (unit) {
		if (!unitToMove) {
			if (hexUnit.people[unit] > 0) {
				unitToMove = unit;
			}
		}
	});
	return unitToMove;
};




const moveAI = (moveAction, map, player) => {

	let moveChoice = null;

	const ownHexagons = selectOwnHexagons(map, player);

	const hexagonOrigin = selectHexagonsWithUnit(ownHexagons, moveAction, player);

	let hexagonDestiny = null;

	if (hexagonOrigin) {
		const vecHexagons = selectVecHexagons(ownHexagons, player, map);
		hexagonDestiny = moveAIfilter(Util, moveAction, player, map, vecHexagons, hexagonOrigin);

		if (hexagonOrigin && hexagonDestiny) {
			if (hexagonOrigin.num !== hexagonDestiny.num) {
				moveChoice = {
					origin: hexagonOrigin.num,
					destiny: hexagonDestiny.num,
					type: setTypeToMove(moveAction, hexagonOrigin)
				}
			}
		}
	}

	return moveChoice;
};

export default moveAI;