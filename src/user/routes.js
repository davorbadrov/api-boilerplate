const controllers = require('./controller')
const Boom = require('boom')

const routes = [
  {
    method: 'POST',
    path: '/users/login',
    config: {
      description: 'login user',
      auth: false,
      handler: async function (request, reply) {
        try {
          const context = this
          const { email, password } = request.payload
          console.log('request.payload', request.payload)
          const userAndToken = await controllers.login(context, email, password)
          reply(userAndToken)
        } catch (err) {
          console.error(err)
          reply(err)
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/users/register',
    config: {
      auth: false,
      description: 'register user',
      handler: async function (request, reply) {
        try {
          const context = this
          const data = request.payload
          const registeredUser = await controllers.register(context, data)
          reply(registeredUser)
        } catch (err) {
          console.error(err)
          reply(err)
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/users',
    config: {
      description: 'get all users',
      handler: async function (request, reply) {
        try {
          const context = this
          const users = await controllers.getAll(context)
          reply(users)
        } catch (err) {
          console.error(err)
          reply(err)
        }
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
          reply(err)
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    config: {
      description: 'update user',
      handler: async function (request, reply) {
        try {
          const context = this
          const userId = request.params.id
          const data = request.payload
          const createdUser = await controllers.update(context, userId, data)
          reply(createdUser)
        } catch (err) {
          console.error(err)
          reply(err)
        }
      }
    }
  }
]

module.exports = routes
