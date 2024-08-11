import { Op } from "sequelize"
import User from "../domain/models/user.model.js"
import Contacts from "../domain/models/contacts.model.js"
import { formatUser } from "../helpers/funtctions.js"

class ContactsController {
  static async filter(request, response) {
    const { email } = request.body

    try {
      const findUsers = await User.findAll({
        attributes: ["id", "email", "name", "image"],
        where: {
          email: { [Op.startsWith]: email }
        }
      })

      return response.status(200).json(findUsers)
    } catch (error) {
      console.log(error)
    }
  }

  static async add(request, response) {
    const { id, userId } = request.body

    try {
      const user = await User.findOne({ where: { id } })

      if(!user) return response.status(404)

      await Contacts.create({
        id: user.id,
        name: user.name,
        email: user.email,
        UserId: userId
      })

      return response.status(200).json(formatUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}

export default ContactsController