/* AUTOMA *****************************/
var AUTOMA = (function() {
	var A = {};

	A.colors = [{
		name: colorNames['red'],
		icon: 'ic',
		style: {
			backgroundColor: 'red',
			color: 'white'
		}
	}, {
		name: colorNames['black'],
		icon: 'ic',
		style: {
			backgroundColor: 'black',
			color: 'white'
		}
	}, {
		name: colorNames['yellow'],
		icon: 'ic',
		style: {
			backgroundColor: 'yellow',
			color: 'black'
		}
	}, {
		name: colorNames['blue'],
		icon: 'ic',
		style: {
			backgroundColor: 'blue',
			color: 'white'
		}
	}, {
		name: colorNames['green'],
		icon: 'ic',
		style: {
			backgroundColor: 'green',
			color: 'white'
		}
	}, {
		name: colorNames['white'],
		icon: 'ic',
		style: {
			backgroundColor: 'white',
			color: 'red'
		}
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
		
	})();



	return A;
})();



/* ************************************/