// const config
const dotenv = require('dotenv')
const getConfig = require('./src/lib/config');

if (process.env.NODE_ENV !== 'production') {
  const settings = dotenv.load()
}

const config = getConfig(process.env)

module.exports = {
  client: 'postgresql',
  connection: {
    host: config.dbHost,
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword,
    port: config.dbPort,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  }
};
