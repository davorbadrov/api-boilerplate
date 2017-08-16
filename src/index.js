const Hapi = require('hapi')
const getConfig = require('./lib/config')
const config = getConfig(process.env)
const server = new Hapi.Server()
const plugins = require('./plugins')
const user = require('./user')

server.connection({ port: config.appPort })

server.register(plugins, err => {
  server.route(user.routes)

  server.start(err => {
    if (err) {
      throw err
    }

    console.log(`Server running at: ${server.info.uri}`)
  })
})
