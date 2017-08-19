const getConfig = require('./config')

test('config is properly processed', () => {
  const config = getConfig({
    APP_PORT: '8080',
    DB_HOST: 'database_host',
    DB_NAME: 'database_name',
    DB_PORT: '5432',
    DB_USER: 'database_username',
    DB_PASSWORD: 'database_password',
    DB_ENABLE_DEBUG: false
  })

  const expected = {
    appPort: 8080,
    dbHost: 'database_host',
    dbName: 'database_name',
    dbPort: 5432,
    dbUser: 'database_username',
    dbPassword: 'database_password',
    dbEnableDebug: false
  }

  expect(config).toEqual(expected)
})

test(`config throws error if something's missing`, () => {
  expect(() => {
    getConfig({
      DB_HOST: 'database_host',
      DB_NAME: 'database_name',
      DB_PORT: 'database_port',
      DB_USER: 'database_username',
      DB_PASSWORD: 'database_password'
    })
  }).toThrow()
})
