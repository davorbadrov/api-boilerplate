const Hapi = require('hapi')
const getConfig = require('./lib/config')
const config = getConfig(process.env)
const server = new Hapi.Server()
const plugins = require('./plugins')
const user = require('./user')
const { setupAuthentication } = require('./lib/authentication')
const db = require('./models')

function initialize () {
  return new Promise((resolve, reject) => {
    server.connection({ port: config.appPort })

    server.bind({
      db
    })

    server.register(plugins, err => {
      if (err) {
        return reject(err)
      }

      setupAuthentication(server, config)

      server.route(user.routes)

      // skip starting the server for tests
      // server.inject() can be used to test endpoints
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
