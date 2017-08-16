const server = require('./server')

server
  .initialize()
  .then(serverInstance => {
    console.log(`Server running at: ${serverInstance.info.uri}`)
  })
  .catch(err => {
    console.error("Couldn't start server", err)
    process.exit(1)
  })
