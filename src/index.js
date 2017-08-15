const Hapi = require('hapi');
const config = require('./lib/config');
const server = new Hapi.Server();

server.connection({ port: config.appPort });
server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});
