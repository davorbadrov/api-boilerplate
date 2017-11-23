const log = require('./log')
const listHttpRoutes = require('./list-http-routes')
const authentication = require('./authentication')
const staticFiles = require('./staticFiles')

module.exports = [log, listHttpRoutes, authentication, staticFiles]
