const controllers = require('./controller')
const Boom = require('boom')

const routes = [
  {
    method: 'GET',
    path: '/users',
    config: {
      description: 'get all users',
      handler: (request, reply) => {
        const users = controllers.getAll()
        reply(users)
      }
    }
  },
  {
    method: 'POST',
    path: '/users',
    config: {
      description: 'create user',
      handler: (request, reply) => {
        reply(Boom.notImplemented('Method not implemented'))
      }
    }
  },
  {
    method: 'POST',
    path: '/users/login',
    config: {
      description: 'login user',
      handler: (request, reply) => {
        reply(reply(Boom.notImplemented('Method not implemented')))
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    config: {
      description: 'update user',
      handler: (request, reply) => {
        reply(reply(Boom.notImplemented('Method not implemented')))
      }
    }
  }
]

module.exports = routes
