const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('./config')(process.env)

function validate (decodedToken, request, callback) {
  // can do blacklisting here
  return callback(null, true)
}

exports.setupAuthentication = (server, config) => {
  server.auth.strategy('jwt', 'jwt', true, {
    key: config.secret,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  })
}

exports.createToken = user => {
  // this can be saved to Redis for token invalidation
  const jti = uuidv4()
  const now = Math.floor(new Date().getTime() / 1000)
  const sevenDaysFromNow = now + 24 * 60 * 60 * 7

  const tokenData = {
    userId: user.id, // user
    jti: jti, // identifier
    iat: now, // isued at
    exp: sevenDaysFromNow // expiry date
  }

  const token = jwt.sign(tokenData, config.secret)
}
