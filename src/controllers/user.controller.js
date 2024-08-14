//const { config_mailler } = require("../helpers/nodemailler")
import { body, validationResult } from 'express-validator'
import User from '../domain/models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { formatUser } from '../helpers/funtctions.js'
import Contacts from '../domain/models/contacts.model.js'
//const { generate_token } = require('../helpers/funtctions')

class UserController {
  validator_body = [
    body('email').notEmpty().isEmail(),
    body('subject').isString(),
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
          errors: error.array(),
        })
      }
    },
  ]

  static async register(request, response) {
    const { email, password } = request.body

    try {
      const user = await User.findOne({ where: { email } })

      if (user)
        return response.status(400).json({
          message: 'Usuario existente',
        })

      const hashedPassword = await bcrypt.hash(password, 10)

      const createdUser = await User.create(
        {
          email,
          password: hashedPassword,
          isNew: true,
        },
        { returning: true }
      )

      const token = jwt.sign({ id: createdUser.id }, 'Secreto', {
        expiresIn: '1m',
      })

      response.cookie('token', token).json(formatUser(createdUser))
    } catch (error) {
      console.log(error)
    }
  }

  static async login(request, response) {
    const { email, password } = request.body

    try {
      const user = await User.findOne({ where: { email } })

      if (!user)
        return response.status(404).json({
          message: 'Usuario no existente',
        })

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if (!isPasswordCorrect)
        return response.status(401).json({
          message: 'Usuario o contraseña incorrectos',
        })

      const contacts = await Contacts.findAll({ where: { UserId: user.id } })
      const imageContact = await User.findOne({
        attributes: ['image'],
        where: { id: user.id },
      })

      const token = jwt.sign({ id: user.id }, 'Secreto', {
        expiresIn: '1h',
      })

      response
        .cookie('token', token)
        .status(200)
        .json({
          user: formatedUser,
          contacts: {
            ...contacts,
            image: imageContact,
          },
        })
    } catch (error) {
      console.log(error)
    }
  }

  static async logout(request, response) {
    const cookie = request.cookies.token

    if (cookie) return response.clearCookie('token').sendStatus(200)
  }

  static async verifyToken(request, response) {
    const cookie = request.cookies.token

    try {
      const id = jwt.verify(cookie, 'Secreto', (error, userId) => {
        if (error)
          return response.clearCookie('token').status(400).json({
            message: 'No autorizado',
          })

        return userId.id
      })

      if (!id) {
        response.clearCookie('token').status(400).json({
          message: 'No autorizado',
        })
      }
      const user = await User.findOne({ where: { id } })

      if (!user)
        return response.status(404).json({
          message: 'Usuario no encontrado',
        })

      const contacts = await Contacts.findAll({
        where: { UserId: user.id },
        include: [
          {
            association: 'User',
            required: true,
          },
        ],
      })
      console.log(
        '=============================== INICIO CONTACTS =============================='
      )
      console.log(contacts.toJSON())
      console.log(contacts.User)
      console.log(
        '=============================== FIN CONTACTS =============================='
      )

      let formatedUser = formatUser(user.toJSON())

      return response.status(200).json({
        user: formatedUser,
        contacts
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async createProfile(request, response) {
    const { image, name, info, id } = request.body

    try {
      const user = await User.findByPk(id)

      if (!user)
        return response.status(404).json({
          message: 'Usuario no encontrado',
        })

      const updatedUser = await User.update(
        {
          image,
          name,
          description: info,
          isNew: false,
        },
        { where: { id }, returning: true }
      )

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
