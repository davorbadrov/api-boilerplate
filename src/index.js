const Hapi = require('hapi');
const getConfig = require('./lib/config');
const config = getConfig(process.env);
const server = new Hapi.Server();

server.connection({ port: config.appPort });
server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});
