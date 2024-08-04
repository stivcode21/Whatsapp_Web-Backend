//const { config_mailler } = require("../helpers/nodemailler")
import { body, validationResult } from "express-validator"
import User from "../domain/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//const { generate_token } = require('../helpers/funtctions')

class UserController {

    validator_body = [
        body("email").notEmpty().isEmail(),
        body("subject").isString(),
        function (req,res,next) {
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

    static async register(request, response) {
        const { email, password } = request.body

        try {
            const user = await User.findOne({ where: { email }})

            if(user) return response.status(400).json({
                message: "Usuario existente"
            })

            const hashedPassword = await bcrypt.hash(password, 10)

            const createdUser = await User.create({ 
                email, 
                password: hashedPassword, 
                isNew: true
            })

            const token = jwt.sign({ id: createdUser.id }, "Secreto", {
                expiresIn: "1h"
            })

            response.cookie("token", token).json({
                id: createdUser.id,
                isNew: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async verifyToken(request, response) {
        const cookie = request.cookies.token
        
        const { id } = jwt.verify(cookie, "Secreto")

        console.log(id)

        if(!id) return res.status(400).json({
            message: "No autorizado"
        })

        try {
            const user = await User.findOne({ where: { id } })

            if(!user) return response.status(404).json({
                message: "Usuario no encontrado"
            })

            return response.status(200).json({
                user
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async createProfile(request, response) {
        console.log(request.body)
    }

    /*async verify(request, response) {
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

    } */
}

export default UserController