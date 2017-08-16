const server = require('./server')

server.initialize().then(serverInstance => {
  console.log(`Server running at: ${serverInstance.info.uri}`)
})
