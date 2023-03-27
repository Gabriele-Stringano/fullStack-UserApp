const Joi= require('joi')

const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly : false})

const userRules = Joi.object({
    username: Joi.string().min(6).max(20),
    password: Joi.string().min(6),
    email: Joi.string().email()
  })

  validateUserRules = validator(userRules)

  module.exports = {
    validateUserRules
  }