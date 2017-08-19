const controllers = require('./controller')
const Boom = require('boom')

const routes = [
  {
    method: 'POST',
    path: '/users/login',
    config: {
      description: 'login user',
      handler: function (request, reply) {
        const context = this
        reply(Boom.notImplemented('Method not implemented'))
      }
    }
  },
  {
    method: 'POST',
    path: '/users/register',
    config: {
      description: 'register user',
      handler: function (request, reply) {
        console.log('request.body', request.body)
        reply(Boom.notImplemented('Method not implemented'))
      }
    }
  },
  {
    method: 'GET',
    path: '/users',
    config: {
      description: 'get all users',
      handler: function (request, reply) {
        const context = this
        const users = controllers.getAll(context)
        reply(users)
      }
    }
  },
  {
    method: 'POST',
    path: '/users',
    config: {
      description: 'create user',
      handler: async function (request, reply) {
        try {
          const context = this
          const data = request.payload
          const createdUser = await controllers.create(context, data)
          reply(createdUser)
        } catch (err) {
          console.error(err)
          reply(Boom.badImplementation())
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    config: {
      description: 'update user',
      handler: function (request, reply) {
        reply(Boom.notImplemented('Method not implemented'))
      }
    }
  }
]

module.exports = routes
