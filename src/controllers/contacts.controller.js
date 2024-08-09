import { Op } from "sequelize"
import User from "../domain/models/user.model.js"

class ContactsController {
  static async add(request, response) {
    const { email } = request.body

    try {
      console.log(email)
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
}

export default ContactsController