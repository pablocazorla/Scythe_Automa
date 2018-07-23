/* AUTOMA *****************************/
var AUTOMA = (function() {
	var A = {};

	A.factions = [{
		name: 'rusviet'
	}, {
		name: 'togawa'
	}, {
		name: 'crimean'
	}, {
		name: 'saxony'
	}, {
		name: 'polania'
	}, {
		name: 'albion'
	}, {
		name: 'nordic'
	}];

	A.types = {
		'Autometta': {
			name: 'Autometta',
			ai: true,
			level: 'Easy',
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
		},
		'Automa': {
			name: 'Automa',
			ai: true,
			level: 'Normal',
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
		},
		'Automaszyna': {
			name: 'Automaszyna',
			ai: true,
			level: 'Hard',
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
		},
		'Ultimaszyna': {
			name: 'Ultimaszyna',
			ai: true,
			level: 'Very hard',
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
		},
		'Human': {
			name: 'Human',
			type: 'HUMAN',
			ai: false
		},
	};

	A.createPlayer = function(playerName, colorIndex) {
		var player = cloneObject(A.types[playerName]);

		//player.color = A.colors[colorIndex];

		if (player.ai) {
			player.currentStep = 0;
			player.advanceStep = function() {
				var nextStep = player.currentStep + 1;
				var step = player.timeline[player.currentStep];
				if (nextStep < player.timeline.length) {
					player.currentStep = nextStep;
					step = player.timeline[player.currentStep];
					if (step.crossRiver) {
						player.crossRiver = true;
					}
					if (step.star) {
						player.stars++;
					}
					if (step.changeEstrategy) {
						player.strategy++;
					}
				}
				return step;
			};
			player.getCurrentStep = function() {
				return player.timeline[player.currentStep];
			};
		}
		return player;
	}

	/* GET CARD **********/
	A.getCard = (function() {
		var deck = [],
			shuffle = function(o) {
				for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			},
			generateDeck = function() {
				deck = originalDeck.slice(0);
				deck = shuffle(deck);
			};
		return function() {
			if (deck.length === 0) {
				generateDeck();
			}

			var card = deck[0];
			deck.shift();

			return card;
		};
	})();



	return A;
})();



/* ************************************/