//const { config_mailler } = require("../helpers/nodemailler")
import { body, validationResult } from "express-validator"
import User from "../domain/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { formatUser } from "../helpers/funtctions.js"
//const { generate_token } = require('../helpers/funtctions')

class UserController {

  validator_body = [
    body("email").notEmpty().isEmail(),
    body("subject").isString(),
    function (req, res, next) {
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
      const user = await User.findOne({ where: { email } })

      if (user) return response.status(400).json({
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

    if (!id) {
      response.clearCookie("token").status(400).json({
        message: "No autorizado"
      })
    }

    try {
      const user = await User.findOne({ where: { id } })

      if (!user) return response.status(404).json({
        message: "Usuario no encontrado"
      })

      let formatedUser = await formatUser(user.toJSON())

      return response.status(200).json({
        user: formatedUser
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async createProfile(request, response) {
    const { image, name, info, id, type } = request.body

    try {
      const user = await User.findByPk(id)

      if(!user) return response.status(404).json({
        message: "Usuario no encontrado"
      })

      const buffer = Buffer.from(image, "base64")
      const blob = new Blob(new Uint8Array(buffer), { type })

      const updatedUser = await User.update({
        image: blob,
        name,
        description: info,
        isNew: false
      }, { where: { id }, returning: true })

      return response.status(200).json(formatUser(updatedUser[1][0]))
    } catch (error) {
      console.log(error)
    }
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