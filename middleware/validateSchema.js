const Joi = require('joi');

const validateSchema = (schema) => {
    return (req, res, next) => {
      let {value, error} =   schema.validate(req.body, {abortEarly: false, stripUnknown: true})
      if(error){

       let errors =  error.details.map(er =>{
            return {
                params: er.context.key,
                value: er.message
            }
        })
        res.send(errors);
      }else{
        next()
      }
    }
}

module.exports = validateSchema