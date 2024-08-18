import { Op } from 'sequelize'
import User from '../domain/models/user.model.js'
import Contacts from '../domain/models/contacts.model.js'
import { formatUser } from '../helpers/funtctions.js'

class ContactsController {
  static async filter(request, response) {
    const { email, id } = request.body

    try {
      const findUsers = await User.findAll({
        attributes: ['id', 'email', 'name', 'image'],
        where: {
          email: { [Op.startsWith]: email },
          id: { [Op.ne]: id },
        },
      })

      return response.status(200).json(findUsers)
    } catch (error) {
      console.log(error)
    }
  }

  static async add(request, response) {
    const { id, userId } = request.body
    console.log('==================================================')
    console.log({ id, userId })
    console.log('==================================================')

    try {
      const user = await User.findOne({ where: { id } })

      if (!user) return response.status(404)

      await Contacts.create({
        id: user.id,
        UserId: userId,
      })

      console.log("Contacto creado exitosamente")

      return response.status(200).json(formatUser(user))
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default ContactsController
