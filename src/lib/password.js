/**
 * Handles user password hashing and verification.
 */
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 12

function generatePasswordHash (plainTextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, SALT_ROUNDS, (error, hash) => {
      error ? reject(error) : resolve(hash)
    })
  })
}

function verifyPassword (plainTextPassword, passwordHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, passwordHash, (error, isSame) => {
      error ? reject(error) : resolve(isSame)
    })
  })
}

module.exports = {
  generatePasswordHash,
  verifyPassword
}
