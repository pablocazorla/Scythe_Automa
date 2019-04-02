const originalDeck = [{
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
    'recruit': 'power'
  },
  'e2': {
    'move': [{
      'type': 'worker'
    }],
    'gain': [{
      'type': 'power',
      'count': 4
    }],
    'recruit': 'power'
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
    'recruit': null
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
      'type': 'mech'
    }],
    'recruit': 'money'
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
    'recruit': null
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
    'recruit': 'popularity'
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
    'recruit': 'card'
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
    'recruit': 'power'
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
      'type': 'mech',
      'faction': 'togawa'
    }, {
      'type': 'worker'
    }, {
      'type': 'money'
    }],
    'recruit': 'money'
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
    'recruit': 'card'
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
    'recruit': null
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
      'type': 'mech'
    }],
    'recruit': 'power'
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
    'recruit': 'popularity'
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
      'type': 'mech',
      'faction': 'rusviet'
    }, {
      'type': 'mech'
    }, {
      'type': 'card'
    }],
    'recruit': 'money'
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
      'type': 'mech',
      'faction': 'togawa'
    }, {
      'type': 'mech'
    }],
    'recruit': null
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
      'type': 'mech'
    }],
    'recruit': 'money'
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
      'type': 'mech'
    }],
    'recruit': 'popularity'
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
    'recruit': 'popularity'
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
      'type': 'mech'
    }, {
      'type': 'power',
      'count': 2
    }],
    'recruit': null
  },
  'e2': {
    'move': [{
      'type': 'mech'
    }],
    'gain': [{
      'type': 'money',
      'count': 2
    }, {
      'type': 'mech'
    }],
    'recruit': null
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
    'recruit': null
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
    'recruit': 'card'
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
    'recruit': null
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
      'type': 'mech'
    }],
    'recruit': 'power'
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
    'recruit': null
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
    'recruit': 'money'
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
    'recruit': 'card'
  },
  'e2': {
    'move': [{
      'attack': 7,
      'type': 'character_or_mech'
    }, {
      'attack': 'worker',
      'type': 'worker_attack'
    }, {
      'type': 'mech'
    }],
    'gain': [{
      'type': 'power',
      'count': 3
    }],
    'recruit': 'popularity'
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
    'recruit': 'money'
  },
  'e2': {
    'move': [{
      'attack': 1,
      'type': 'character_or_mech'
    }, {
      'attack': 'worker',
      'type': 'worker_attack'
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
    'recruit': 'card'
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
      'type': 'mech'
    }],
    'recruit': null
  },
  'e2': {
    'move': [{
      'attack': 5,
      'type': 'character_or_mech'
    }, {
      'attack': 'worker',
      'type': 'worker_attack'
    }, {
      'type': 'mech'
    }],
    'gain': [{
      'type': 'power',
      'faction': 'saxony'
    }, {
      'type': 'mech'
    }, {
      'type': 'money'
    }],
    'recruit': null
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
      'type': 'worker_attack'
    }, {
      'type': 'worker'
    }],
    'gain': [{
      'type': 'money',
      'count': 2
    }],
    'recruit': 'power'
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
    'recruit': 'popularity'
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
    'recruit': null
  },
  'e2': {
    'move': [{
      'type': 'encounter_or_factory'
    }, {
      'type': 'character'
    }],
    'gain': [{
      'type': 'mech',
      'faction': 'albion'
    }, {
      'type': 'worker'
    }, {
      'type': 'money',
      'count': 2
    }],
    'recruit': null
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
      'type': 'worker_attack'
    }, {
      'type': 'worker'
    }],
    'gain': [{
      'type': 'worker'
    }],
    'recruit': null
  },
  'e2': {
    'move': [{
      'type': 'encounter_or_factory',
      'faction': 'albion'
    }, {
      'attack': 'worker',
      'type': 'worker_attack'
    }, {
      'type': 'worker'
    }],
    'gain': [{
      'type': 'power',
      'count': 3
    }, {
      'type': 'money'
    }],
    'recruit': 'card'
  },
  'advance': true,
  'combat': {
    'power': [7, 7, 7],
    'cards': 1
  },
  'resources': 1
}];

const shuffle = function (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i,10), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },
  generateDeck = function () {
    return shuffle(originalDeck.slice(0));
  };

const createDeck = function () {
  // eslint-disable-next-line 
  let deck = generateDeck();
  return {
    getCard:function(){
      // if(deck.length === 0){
      //   deck = generateDeck();
      // }
      // const card = deck[0];
      // deck.shift();
      //return card;



      return {
        //'notAutometta':true,
        'num': 1,
        'e1': {
          'move': [
            // {
            // 	'type': 'worker',
            // 	//	'faction': 'nordic'
            // },
            // {
            // 	'type': 'mech',
            // },
            // {
            // 	'type': 'character'
            // },					
            {
            	'type': 'encounter_or_factory'
            },
            // // Attack
            // {
            //   'attack': 1,
            //   'type': 'character_or_mech'
            // },
            // {
            //   'attack': 'worker',
            //   'type': 'worker_attack'
            // }
          ],
          'gain': [
            {
              'type': 'power',
              'count': 9
            },
            {
              'type': 'worker',
              'count': 2
            },
            {
              'type': 'card',
              'count': 3
            },
            // {
            //   'type': 'mech'
            // },
            // {
            //   'type': 'money',
            //   'count': 2
            // },
          ],
          'recruit': null//'popularity'
        },
        'advance': true,
        'combat': {
          'power': [6, 7, 7],
          'cards': 1
        },
        'resources': 4
      };

















    }
  };
}

export default createDeck;