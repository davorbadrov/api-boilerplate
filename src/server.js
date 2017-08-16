const Hapi = require('hapi')
const getConfig = require('./lib/config')
const config = getConfig(process.env)
const server = new Hapi.Server()
const plugins = require('./plugins')
const user = require('./user')

function initialize () {
  return new Promise((resolve, reject) => {
    server.connection({ port: config.appPort })
    server.register(plugins, err => {
      if (err) {
        return reject(err)
      }

      server.route(user.routes)

      // skip starting the server for tests
      // we can use server.inject() to test endpoints
      if (config.nodeEnv === 'test') {
        return resolve(server)
      }

      server.start(err => {
        if (err) {
          return reject(err)
        }

        return resolve(server)
      })
    })
  })
}

module.exports = {
  initialize
}
