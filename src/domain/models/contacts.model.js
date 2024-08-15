import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/connection.js";

class Contacts extends Model {}

Contacts.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  sequelize,
  timestamps: false,
  modelName: "Contact",
  tableName: "Contacts"
})

export default Contacts