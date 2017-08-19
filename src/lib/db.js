const knex = require('knex')

module.exports = config => {
  return knex({
    client: 'pg',
    connection: {
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      debug: config.dbEnableDebug
    }
  })
}
