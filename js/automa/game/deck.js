/* DECK ***************/
var originalDeck = [{
	'num': 1,
	'e1': {
		'move': [{
			'type': 'worker',
			'faction': 'nordic'
		}, {
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'power'
		}, {
			'type': 'worker'
		}],
		'recruit': ['power']
	},
	'e2': {
		'move': [{
			'type': 'worker'
		}],
		'gain': [{
			'type': 'power',
			'count': 4
		}],
		'recruit': ['power']
	},
	'advance': true,
	'combat': {
		'power': [6, 7, 7],
		'cards': 1
	},
	'resources': 1
}, {
	'num': 2,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'polania'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'money'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'polania'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'card'
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': ['money']
	},
	'advance': true,
	'combat': {
		'power': [5, 6, 7],
		'cards': 2
	},
	'resources': 2
}, {
	'num': 3,
	'e1': {
		'move': [{
			'type': 'worker'
		}],
		'gain': [{
			'type': 'power',
			'count': 3
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'worker'
		}],
		'gain': [{
			'type': 'power',
			'count': 2
		}, {
			'type': 'worker'
		}],
		'recruit': ['popularity']
	},
	'advance': true,
	'combat': {
		'power': [3, 7, 7],
		'cards': 0
	},
	'resources': 0
}, {
	'num': 4,
	'notAutometta': true,
	'e1': {
		'move': [{
			'type': 'worker'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'card'
		}],
		'recruit': ['card']
	},
	'e2': {
		'move': [{
			'type': 'worker'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'money',
			'count': 2
		}],
		'recruit': ['power']
	},
	'advance': false,
	'combat': {
		'power': [0, 1, 2],
		'cards': 1
	},
	'resources': 0
}, {
	'num': 5,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'albion'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'character_or_mech',
			'faction': 'togawa'
		}, {
			'type': 'worker'
		}, {
			'type': 'money'
		}],
		'recruit': ['money']
	},
	'e2': {
		'move': [{
			'type': 'mech'
		}],
		'gain': [{
			'type': 'power',
			'count': 4
		}, {
			'type': 'worker'
		}],
		'recruit': ['card']
	},
	'advance': true,
	'combat': {
		'power': [2, 4, 7],
		'cards': 1
	},
	'resources': 4
}, {
	'num': 6,
	'e1': {
		'move': [{
			'type': 'worker'
		}],
		'gain': [{
			'type': 'power',
			'count': 2
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'mech'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'power',
			'count': 2
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': ['power']
	},
	'advance': true,
	'combat': {
		'power': [7, 7, 7],
		'cards': 1
	},
	'resources': 0
}, {
	'num': 7,
	'notAutometta': true,
	'e1': {
		'move': [{
			'attack': 5,
			'type': 'character_or_mech',
			'faction': 'saxony'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'worker'
		}, {
			'type': 'money'
		}],
		'recruit': ['popularity']
	},
	'e2': {
		'move': [{
			'attack': 5,
			'type': 'character_or_mech',
			'faction': 'saxony'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'character_or_mech',
			'faction': 'rusviet'
		}, {
			'type': 'character_or_mech'
		}, {
			'type': 'card'
		}],
		'recruit': ['money']
	},
	'advance': true,
	'combat': {
		'power': [5, 7, 7],
		'cards': 0
	},
	'resources': 2
}, {
	'num': 8,
	'notAutometta': true,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'togawa'
		}, {
			'type': 'mech'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'character_or_mech',
			'faction': 'togawa'
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'togawa'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'power',
			'faction': 'saxony'
		}, {
			'type': 'money'
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': ['money']
	},
	'advance': true,
	'combat': {
		'power': [0, 7, 7],
		'cards': 2
	},
	'resources': 1
}, {
	'num': 9,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'polania'
		}, {
			'type': 'mech'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'worker'
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': ['popularity']
	},
	'e2': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'polania'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'power',
			'count': 3
		}, {
			'type': 'worker'
		}],
		'recruit': ['popularity']
	},
	'advance': true,
	'combat': {
		'power': [4, 7, 7],
		'cards': 1
	},
	'resources': 3
}, {
	'num': 10,
	'e1': {
		'move': [{
			'type': 'mech'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'character_or_mech'
		}, {
			'type': 'power',
			'count': 2
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'mech'
		}],
		'gain': [{
			'type': 'money',
			'count': 2
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': []
	},
	'advance': true,
	'combat': {
		'power': [0, 0, 0],
		'cards': 1
	},
	'resources': 1
}, {
	'num': 11,
	'e1': {
		'move': [{
			'type': 'mech'
		}, {
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'worker',
			'faction': 'rusviet'
		}, {
			'type': 'worker'
		}, {
			'type': 'money'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'worker',
			'faction': 'nordic'
		}, {
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'power',
			'count': 3
		}, {
			'type': 'worker'
		}],
		'recruit': ['card']
	},
	'advance': true,
	'combat': {
		'power': [6, 7, 7],
		'cards': 2
	},
	'resources': 0
}, {
	'num': 12,
	'e1': {
		'move': [{
			'type': 'worker',
			'faction': 'nordic'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'power',
			'count': 4
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'worker',
			'faction': 'nordic'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'worker'
		}, {
			'type': 'money'
		}, {
			'type': 'character_or_mech'
		}],
		'recruit': ['power']
	},
	'advance': true,
	'combat': {
		'power': [4, 5, 7],
		'cards': 2
	},
	'resources': 1
}, {
	'num': 13,
	'e1': {
		'move': [{
			'attack': 4,
			'type': 'character_or_mech',
			'faction': 'saxony'
		}, {
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'money'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'attack': 5,
			'type': 'character_or_mech',
			'faction': 'saxony'
		}, {
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'card'
		}, {
			'type': 'money',
			'count': 2
		}],
		'recruit': ['money']
	},
	'advance': true,
	'combat': {
		'power': [3, 5, 7],
		'cards': 3
	},
	'resources': 0
}, {
	'num': 14,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'worker'
		}, {
			'type': 'card'
		}],
		'recruit': ['card']
	},
	'e2': {
		'move': [{
			'attack': 7,
			'type': 'character_or_mech'
		}, {
			'attack': 'worker',
			'type': 'worker'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'power',
			'count': 3
		}],
		'recruit': ['popularity']
	},
	'advance': true,
	'combat': {
		'power': [1, 1, 1],
		'cards': 1
	},
	'resources': 0
}, {
	'num': 15,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'power',
			'count': 3
		}, {
			'type': 'money'
		}],
		'recruit': ['money']
	},
	'e2': {
		'move': [{
			'attack': 1,
			'type': 'character_or_mech'
		}, {
			'attack': 'worker',
			'type': 'worker'
		}, {
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'money',
			'faction': 'crimean'
		}],
		'recruit': ['card']
	},
	'advance': false,
	'combat': {
		'power': [7, 7, 7],
		'cards': 0
	},
	'resources': 2
}, {
	'num': 16,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'character_or_mech'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'attack': 5,
			'type': 'character_or_mech'
		}, {
			'attack': 'worker',
			'type': 'worker'
		}, {
			'type': 'mech'
		}],
		'gain': [{
			'type': 'power',
			'faction': 'saxony'
		}, {
			'type': 'character_or_mech'
		}, {
			'type': 'money'
		}],
		'recruit': []
	},
	'advance': true,
	'combat': {
		'power': [5, 7, 7],
		'cards': 1
	},
	'resources': 4
}, {
	'num': 17,
	'notAutometta': true,
	'e1': {
		'move': [{
			'attack': 6,
			'type': 'character_or_mech'
		}, {
			'attack': 'worker',
			'type': 'worker'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'money',
			'count': 2
		}],
		'recruit': ['power']
	},
	'e2': {
		'move': [{
			'attack': 8,
			'type': 'character_or_mech'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'money',
			'faction': 'crimean'
		}, {
			'type': 'money'
		}, {
			'type': 'worker'
		}],
		'recruit': ['popularity']
	},
	'advance': false,
	'combat': {
		'power': [7, 7, 7],
		'cards': 2
	},
	'resources': 2
}, {
	'num': 18,
	'e1': {
		'move': [{
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'worker',
			'faction': 'albion'
		}, {
			'type': 'worker'
		}, {
			'type': 'money'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'encounter_or_factory'
		}, {
			'type': 'character'
		}],
		'gain': [{
			'type': 'character_or_mech',
			'faction': 'albion'
		}, {
			'type': 'worker'
		}, {
			'type': 'money',
			'count': 2
		}],
		'recruit': []
	},
	'advance': true,
	'combat': {
		'power': [1, 1, 7],
		'cards': 0
	},
	'resources': 1
}, {
	'num': 19,
	'e1': {
		'move': [{
			'attack': 'worker',
			'type': 'worker'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'worker'
		}],
		'recruit': []
	},
	'e2': {
		'move': [{
			'type': 'encounter_or_factory',
			'faction': 'albion'
		}, {
			'attack': 'worker',
			'type': 'worker'
		}, {
			'type': 'worker'
		}],
		'gain': [{
			'type': 'power',
			'count': 3
		}, {
			'type': 'money'
		}],
		'recruit': ['card']
	},
	'advance': true,
	'combat': {
		'power': [7, 7, 7],
		'cards': 1
	},
	'resources': 1
}];


// var c = [];
// originalDeck.forEach(function(b, k) {
// 	if (!b.advance) c.push(b.num);
// });

// log('c', c);