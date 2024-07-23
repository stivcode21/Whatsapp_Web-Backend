const { config_mailler } = require("../helpers/nodemailler")
const { body, validationResult } = require("express-validator")
const { generate_token } = require('../helpers/funtctions')

class UserController {

    validator_body = [
        body("email").notEmpty().isEmail(),
        body("subject").isString(),
        (req,res,next) => {
            try {
                const result = validationResult(req)
                if (result.isEmpty()) {
                   return next() 
                }
                return result.throw()
                
            } catch (error) {
                res.status(403)
                res.send({
                    errors: error.array()
                })
            }
        }
    ]



    index(request, response) {
        response.send("database")
    }

    async verify(request, response) {
        const { email, subject } = request.body

        
        //TODO Hacer una plantilla de mensaje
        const info = await config_mailler().sendMail({
            from: process.env.EMAIL_PROVEDOR,
            to: email,
            subject,
            text: `Su codigo es ${generate_token(4)}`
        })
        
       console.log(generate_token(4));
        return response.send({email, subject});

    } 
}

module.exports = UserController