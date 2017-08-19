const joi = require('joi')
const { pick, mapKeys, camelCase } = require('lodash')

/**
 * Returns object with only validated env variables in camel casing
 *
 * @param  {object} enviromentVariables  takes process.env
 * @return {object}                      object with camel cased validated params
 */
module.exports = function getConfig (enviromentVariables) {
  const config = validateEnvVariables(enviromentVariables)
  const camelCasedEnv = convertEnvKeysToCamelCase(config)
  return camelCasedEnv
}

function validateEnvVariables (enviromentVariables) {
  const configSchemaParams = {
    NODE_ENV: joi
      .string()
      .allow(['development', 'production', 'test'])
      .default('development'),
    APP_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().allow('').required(),
    DB_ENABLE_DEBUG: joi.boolean().default(false).optional()
  }

  const envVars = pick(enviromentVariables, Object.keys(configSchemaParams))
  const envVarsSchema = joi.object().keys(configSchemaParams).required()

  const { error, value: validatedEnvironmentVariables } = joi.validate(
    envVars,
    envVarsSchema
  )

  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }

  return validatedEnvironmentVariables
}

function convertEnvKeysToCamelCase (object) {
  return mapKeys(object, (_, key) => camelCase(key))
}
