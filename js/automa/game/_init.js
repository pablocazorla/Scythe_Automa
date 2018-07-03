/* GAME API **************/
var GAME = null;

var GAMECONFIG = {
	factions: [{
		name: 'rusviet',
		power: 3,
		cards: 2
	}, {
		name: 'togawa',
		power: 0,
		cards: 2
	}, {
		name: 'crimean',
		power: 5,
		cards: 0
	}, {
		name: 'saxony',
		power: 1,
		cards: 4
	}, {
		name: 'polania',
		power: 2,
		cards: 3
	}, {
		name: 'albion',
		power: 3,
		cards: 0
	}, {
		name: 'nordic',
		power: 4,
		cards: 1
	}],
	playerTypes: [{
		name: 'None',
		ai: false,
		icon: ''
	},{
		name: 'Human',
		ai: false,
		icon: 'fa fa-user-o'
	}, {
		name: 'Autometta',
		ai: true,
		level: 'Easy',
		icon: 'fa fa-cogs',
		crossRiver: false,
		strategy: 1,
		stars: 0,
		timeline: [{}, {}, {}, {}, {}, {
			crossRiver: true
		}, {}, {}, {}, {}, {
			changeEstrategy: true,
			star: true
		}, {}, {}, {}, {}, {
			star: true
		}, {}, {}, {
			star: true
		}, {}, {
			star: true
		}, {}, {
			star: true
		}, {
			star: true
		}]
	}, {
		name: 'Automa',
		ai: true,
		level: 'Normal',
		icon: 'fa fa-cogs',
		crossRiver: false,
		strategy: 1,
		stars: 0,
		timeline: [{}, {}, {}, {}, {
			crossRiver: true
		}, {}, {}, {}, {}, {
			changeEstrategy: true,
			star: true
		}, {}, {}, {}, {}, {
			star: true
		}, {}, {}, {
			star: true
		}, {}, {
			star: true
		}, {
			star: true
		}, {
			star: true
		}]
	}, {
		name: 'Automaszyna',
		ai: true,
		level: 'Hard',
		icon: 'fa fa-cogs',
		crossRiver: false,
		strategy: 1,
		stars: 0,
		timeline: [{}, {}, {}, {
			crossRiver: true
		}, {}, {}, {}, {}, {}, {
			changeEstrategy: true,
			star: true
		}, {}, {}, {
			star: true
		}, {}, {
			star: true
		}, {}, {
			star: true
		}, {
			star: true
		}, {
			star: true
		}]
	}, {
		name: 'Ultimaszyna',
		ai: true,
		level: 'Very hard',
		icon: 'fa fa-cogs',
		crossRiver: true,
		strategy: 1,
		stars: 0,
		timeline: [{
			crossRiver: true
		}, {}, {}, {}, {}, {}, {}, {}, {
			changeEstrategy: true,
			star: true
		}, {}, {}, {
			star: true
		}, {}, {
			star: true
		}, {}, {
			star: true
		}, {
			star: true
		}, {
			star: true
		}]
	}]
};

/* CREATE GAME **************************************/
var createGame = function(factionToCreate) {
		var G = {};