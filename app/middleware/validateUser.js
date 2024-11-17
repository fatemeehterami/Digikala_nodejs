const Joi = require('joi')

const userSchema = Joi.object({
    mobile: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    verificationCode: Joi.string().length(6),
})

function validationUser(req,res,next){
    const {error} = userSchema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next()
}

module.exports = validationUser