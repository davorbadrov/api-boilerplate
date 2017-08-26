const Good = require('good')

const options = {
  ops: {
    interval: 0
  },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [
          {
            log: '*',
            response: '*'
          }
        ]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
}

module.exports = {
  register: Good,
  options
}
