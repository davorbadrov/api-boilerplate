const Hapi = require('hapi')
const getConfig = require('./lib/config')
const config = getConfig(process.env)
const server = new Hapi.Server()
const plugins = require('./plugins')
const user = require('./user')
const { setupAuthentication } = require('./lib/authentication')
const db = require('./models')
const staticFileRoutes = require('./lib/files')

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

      console.log('user.routes', user.routes)
      console.log('staticFileRoutes', staticFileRoutes)

      server.route(user.routes)
      server.route(staticFileRoutes)

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
