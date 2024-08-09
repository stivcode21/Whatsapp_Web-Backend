import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/connection.js";

class Contacts extends Model {}

Contacts.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: "Contact",
  tableName: "Contacts"
})

export default Contacts