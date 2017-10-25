const Boom = require('boom')
const controllers = require('./controller')

const routes = [
  {
    method: 'POST',
    path: '/api/users/login',
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
    path: '/api/users/register',
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
    path: '/api/users',
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
    method: 'GET',
    path: '/api/users/{id}',
    config: {
      description: 'get single user',
      handler: async function (request, reply) {
        try {
          const context = this
          const userId = request.params.id
          const user = await controllers.getOne(context, userId)

          if (!user) {
            return reply(Boom.notFound('The user cannot be found.'))
          }

          reply(user)
        } catch (err) {
          console.error(err)
          reply(err)
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/users/me',
    config: {
      description: 'get logged in user',
      handler: async function (request, reply) {
        try {
          const context = this

          const userCredentials = request.auth.credentials
          const userId = userCredentials && userCredentials.userId

          if (!userId) {
            return reply(Boom.badRequest("There's an error with your login"))
          }

          const user = await controllers.getOne(context, userId)

          if (!user) {
            return reply(Boom.notFound('Your profile seems to be missing.'))
          }

          return reply(user)
        } catch (err) {
          console.error(err)
          return reply(err)
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/users',
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
    path: '/api/users/{id}',
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
