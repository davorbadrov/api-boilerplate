// const config
const dotenv = require('dotenv')
const getConfig = require('../src/lib/config')

if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}

const config = getConfig(process.env)

const dbConfig = {
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  host: config.dbHost,
  dialect: 'postgres'
}

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig
}
