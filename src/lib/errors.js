const get = require('lodash/get')
const Boom = require('boom')

module.exports = {
  handleDatabaseError
}

function handleDatabaseError (error) {
  if (isSequelizeValidationError(error)) {
    const message = extractSequelizeValidationMessage(error)
    throw Boom.badRequest(message)
  } else {
    throw error
  }
}

function isSequelizeValidationError (error) {
  if (
    error.message === 'Validation error' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return true
  }

  return false
}

function extractSequelizeValidationMessage (error) {
  const message = get(error, 'errors[0].message')
  if (message) {
    return message[0].toUpperCase() + message.slice(1)
  }

  return 'Unknown validation error occured'
}
