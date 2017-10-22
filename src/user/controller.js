const Boom = require('boom')
const { createToken } = require('../lib/authentication')
const { verifyPassword, generatePasswordHash } = require('../lib/password')

function getAll ({ db }) {
  return db.user.findAll()
}

function create ({ db }, userData) {
  return db.user.create(userData)
}

function update ({ db }, id, userData) {
  return db.user.update({ where: { id } }, userData)
}

async function login ({ db }, email, password) {
  const userModel = await db.user.scope('safe').findOne({ where: { email } })
  const user = userModel.get({ plain: true })

  if (!user) {
    throw new Boom("Email doesn't exist")
  }

  const doPasswordsMatch = await verifyPassword(password, user.password)

  if (!doPasswordsMatch) {
    throw new Boom('Password is incorrect')
  }

  delete user.password
  const token = createToken(user)

  return {
    token,
    user
  }
}

async function register ({ db }, userData) {
  const password = await generatePasswordHash(userData.password)
  userData.password = password
  const user = await create({ db }, userData)
  return user
}

module.exports = {
  getAll,
  create,
  update,
  login,
  register
}
