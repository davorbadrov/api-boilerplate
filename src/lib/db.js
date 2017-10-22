const Sequelize = require('sequelize')

module.exports = config => {
  const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
      host: config.dbHost,
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
    }
  )

  return sequelize
}
