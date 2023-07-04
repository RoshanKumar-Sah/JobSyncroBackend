const Joi = require('joi');

const SignupSchema = Joi.object({
    name: Joi.string()
        .max(100)
        .required(),
    password: Joi.string()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
})


const LoginSchema = Joi.object({
    password: Joi.string()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
})



module.exports = {
    SignupSchema,
    LoginSchema
}

