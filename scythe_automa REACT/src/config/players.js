export default [{
  name: 'None',
  ai: false,
  icon: ''
}, {
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
  step: 0,
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
  step: 0,
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
  step: 0,
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
  step: 0,
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
}];