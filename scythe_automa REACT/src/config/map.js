export const initialMap = {
	'rusviet': [48, 47, 57],
	'togawa': [88, 87, 77],
	'crimean': [93, 84, 94],
	'saxony': [81, 82, 71],
	'polania': [41, 42, 51],
	'albion': [12, 22, 23],
	'nordic': [15, 25, 26],
};

export const getBaseNumByFaction = faction => {
  return initialMap[faction][0];
};

export const notCrossRiverHexNum = {
	'rusviet': '48-47-56-57',	
	'crimean': '93-94-84-85',
	'saxony': '81-71-72-82',
	'polania': '41-42-51-52',	
	'nordic': '15-25-26-35',
	'togawa': '88-22-23-32-43-44-34-54-55-46-36-37-27-64-74-73-63-62-61-66-75-76-86-77-87',
	'albion': '12-22-23-32-43-44-34-54-55-46-36-37-27-64-74-73-63-62-61-66-75-76-86-77-87'
};


export default {
  '12': {
    'num': 12,
    'type': 'head',
    'factionHead': 'albion',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'albion',
    'attack': null,
    'distance': 4
  },
  '15': {
    'num': 15,
    'type': 'head',
    'factionHead': 'nordic',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'nordic',
    'attack': null,
    'distance': 4
  },
  '22': {
    'num': 22,
    'type': 'iron',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '23': {
    'num': 23,
    'type': 'farm',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '24': {
    'num': 24,
    'type': 'aldea',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '25': {
    'num': 25,
    'type': 'wood',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '26': {
    'num': 26,
    'type': 'oil',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '27': {
    'num': 27,
    'type': 'aldea',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '31': {
    'num': 31,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '32': {
    'num': 32,
    'type': 'oil',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '33': {
    'num': 33,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '34': {
    'num': 34,
    'type': 'oil',
    'tunnel': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 1
    },
    'faction': 'crimean',
    'attack': null,
    'distance': 2
  },
  '35': {
    'num': 35,
    'type': 'iron',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '36': {
    'num': 36,
    'type': 'farm',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '37': {
    'num': 37,
    'type': 'farm',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '41': {
    'num': 41,
    'type': 'head',
    'factionHead': 'polania',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'polania',
    'attack': null,
    'distance': 4
  },
  '42': {
    'num': 42,
    'type': 'wood',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '43': {
    'num': 43,
    'type': 'iron',
    'tunnel': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '44': {
    'num': 44,
    'type': 'wood',
    'people': {
      'worker': 0,
      'mech': 1,
      'character': 0
    },
    'faction': 'crimean',
    'attack': null,
    'distance': 1
  },
  '45': {
    'num': 45,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 1
  },
  '46': {
    'num': 46,
    'type': 'wood',
    'tunnel': true,
    'people': {
      'worker': 0,
      'mech': 1,
      'character': 0
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 2
  },
  '47': {
    'num': 47,
    'type': 'aldea',
    'people': {
      'worker': 1,
      'mech': 1,
      'character': 0
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 3
  },
  '48': {
    'num': 48,
    'type': 'head',
    'factionHead': 'rusviet',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 4
  },
  '51': {
    'num': 51,
    'type': 'farm',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '52': {
    'num': 52,
    'type': 'aldea',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '53': {
    'num': 53,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 1
  },
  '54': {
    'num': 54,
    'type': 'factory',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 0
  },
  '55': {
    'num': 55,
    'type': 'iron',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 1
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 1
  },
  '56': {
    'num': 56,
    'type': 'oil',
    'encounter': true,
    'people': {
      'worker': 1,
      'mech': 0,
      'character': 0
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 2
  },
  '57': {
    'num': 57,
    'type': 'iron',
    'people': {
      'worker': 1,
      'mech': 0,
      'character': 0
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 3
  },
  '61': {
    'num': 61,
    'type': 'wood',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '62': {
    'num': 62,
    'type': 'wood',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '63': {
    'num': 63,
    'type': 'farm',
    'tunnel': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '64': {
    'num': 64,
    'type': 'oil',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 1
  },
  '65': {
    'num': 65,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 1
  },
  '66': {
    'num': 66,
    'type': 'aldea',
    'tunnel': true,
    'people': {
      'worker': 1,
      'mech': 1,
      'character': 0
    },
    'faction': 'rusviet',
    'attack': null,
    'distance': 2
  },
  '67': {
    'num': 67,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '71': {
    'num': 71,
    'type': 'iron',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '72': {
    'num': 72,
    'type': 'aldea',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '73': {
    'num': 73,
    'type': 'aldea',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '74': {
    'num': 74,
    'type': 'oil',
    'tunnel': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 2
  },
  '75': {
    'num': 75,
    'type': 'wood',
    'people': {
      'worker': 1,
      'mech': 0,
      'character': 0
    },
    'faction': 'crimean',
    'attack': null,
    'distance': 2
  },
  '76': {
    'num': 76,
    'type': 'iron',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '77': {
    'num': 77,
    'type': 'oil',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '81': {
    'num': 81,
    'type': 'head',
    'factionHead': 'saxony',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'saxony',
    'attack': null,
    'distance': 5
  },
  '82': {
    'num': 82,
    'type': 'oil',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '83': {
    'num': 83,
    'type': 'lake',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '84': {
    'num': 84,
    'type': 'farm',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '85': {
    'num': 85,
    'type': 'iron',
    'encounter': true,
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '86': {
    'num': 86,
    'type': 'aldea',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 3
  },
  '87': {
    'num': 87,
    'type': 'farm',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  },
  '88': {
    'num': 88,
    'type': 'head',
    'factionHead': 'togawa',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'togawa',
    'attack': null,
    'distance': 5
  },
  '93': {
    'num': 93,
    'type': 'head',
    'factionHead': 'crimean',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': 'crimean',
    'attack': null,
    'distance': 4
  },
  '94': {
    'num': 94,
    'type': 'aldea',
    'people': {
      'worker': 0,
      'mech': 0,
      'character': 0
    },
    'faction': null,
    'attack': null,
    'distance': 4
  }
};


// export default {
//   '12': {
//     'num': 12,
//     'type': 'head',
//     'factionHead': 'albion',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'albion',
//     'attack': null,
//     'distance': 4
//   },
//   '15': {
//     'num': 15,
//     'type': 'head',
//     'factionHead': 'nordic',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'nordic',
//     'attack': null,
//     'distance': 4
//   },
//   '22': {
//     'num': 22,
//     'type': 'iron',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '23': {
//     'num': 23,
//     'type': 'farm',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '24': {
//     'num': 24,
//     'type': 'aldea',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '25': {
//     'num': 25,
//     'type': 'wood',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '26': {
//     'num': 26,
//     'type': 'oil',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '27': {
//     'num': 27,
//     'type': 'aldea',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '31': {
//     'num': 31,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '32': {
//     'num': 32,
//     'type': 'oil',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '33': {
//     'num': 33,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '34': {
//     'num': 34,
//     'type': 'oil',
//     'tunnel': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '35': {
//     'num': 35,
//     'type': 'iron',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '36': {
//     'num': 36,
//     'type': 'farm',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '37': {
//     'num': 37,
//     'type': 'farm',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '41': {
//     'num': 41,
//     'type': 'head',
//     'factionHead': 'polania',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'polania',
//     'attack': null,
//     'distance': 4
//   },
//   '42': {
//     'num': 42,
//     'type': 'wood',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '43': {
//     'num': 43,
//     'type': 'iron',
//     'tunnel': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '44': {
//     'num': 44,
//     'type': 'wood',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 1
//   },
//   '45': {
//     'num': 45,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 1
//   },
//   '46': {
//     'num': 46,
//     'type': 'wood',
//     'tunnel': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '47': {
//     'num': 47,
//     'type': 'aldea',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '48': {
//     'num': 48,
//     'type': 'head',
//     'factionHead': 'rusviet',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'rusviet',
//     'attack': null,
//     'distance': 4
//   },
//   '51': {
//     'num': 51,
//     'type': 'farm',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '52': {
//     'num': 52,
//     'type': 'aldea',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '53': {
//     'num': 53,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 1
//   },
//   '54': {
//     'num': 54,
//     'type': 'factory',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 0
//   },
//   '55': {
//     'num': 55,
//     'type': 'iron',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 1
//   },
//   '56': {
//     'num': 56,
//     'type': 'oil',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '57': {
//     'num': 57,
//     'type': 'iron',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '61': {
//     'num': 61,
//     'type': 'wood',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '62': {
//     'num': 62,
//     'type': 'wood',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '63': {
//     'num': 63,
//     'type': 'farm',
//     'tunnel': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '64': {
//     'num': 64,
//     'type': 'oil',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 1
//   },
//   '65': {
//     'num': 65,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 1
//   },
//   '66': {
//     'num': 66,
//     'type': 'aldea',
//     'tunnel': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '67': {
//     'num': 67,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '71': {
//     'num': 71,
//     'type': 'iron',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '72': {
//     'num': 72,
//     'type': 'aldea',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '73': {
//     'num': 73,
//     'type': 'aldea',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '74': {
//     'num': 74,
//     'type': 'oil',
//     'tunnel': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '75': {
//     'num': 75,
//     'type': 'wood',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 2
//   },
//   '76': {
//     'num': 76,
//     'type': 'iron',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '77': {
//     'num': 77,
//     'type': 'oil',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '81': {
//     'num': 81,
//     'type': 'head',
//     'factionHead': 'saxony',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'saxony',
//     'attack': null,
//     'distance': 5
//   },
//   '82': {
//     'num': 82,
//     'type': 'oil',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '83': {
//     'num': 83,
//     'type': 'lake',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '84': {
//     'num': 84,
//     'type': 'farm',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '85': {
//     'num': 85,
//     'type': 'iron',
//     'encounter': true,
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '86': {
//     'num': 86,
//     'type': 'aldea',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 3
//   },
//   '87': {
//     'num': 87,
//     'type': 'farm',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   },
//   '88': {
//     'num': 88,
//     'type': 'head',
//     'factionHead': 'togawa',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'togawa',
//     'attack': null,
//     'distance': 5
//   },
//   '93': {
//     'num': 93,
//     'type': 'head',
//     'factionHead': 'crimean',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': 'crimean',
//     'attack': null,
//     'distance': 4
//   },
//   '94': {
//     'num': 94,
//     'type': 'aldea',
//     'people': {
//       'worker': 0,
//       'mech': 0,
//       'character': 0
//     },
//     'faction': null,
//     'attack': null,
//     'distance': 4
//   }
// };