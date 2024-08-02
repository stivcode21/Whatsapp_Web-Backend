import { DataTypes, Model } from "sequelize"
import connectDB from "../../infrastructure/database/connection"
const { User } = require("./user.model")

class Account extends Model {}

Account.init({}, {
    sequelize: connectDB(),
    tableName: "Cuentas"
})

Account.belongsTo(User)

export default Account