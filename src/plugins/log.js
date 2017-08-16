const Good = require('good')

const goodOptions = {
  reporters: {
    consoleReporter: [
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
}

module.exports = {
  register: Good,
  goodOptions
}
