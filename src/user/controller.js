const { createToken } = require('../lib/authentication')
const { verifyPassword, generatePasswordHash } = require('../lib/password')

function getAll ({ db }) {
  return db.select().from('user')
}

function create ({ db }, userData) {
  return db('user')
    .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    .insert(userData)
}

function update ({ db }, id, userData) {
  return db('user')
    .where({ id })
    .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    .update(userData)
}

async function login ({ db }, email, password) {
  const user = await db
    .first('id', 'name', 'email', 'password')
    .where({ email })
    .from('user')

  if (!user) {
    throw new Boom("Email doesn't exist")
  }

  console.log(
    'password',
    password,
    'user',
    user,
    'user.password',
    user.password
  )
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
