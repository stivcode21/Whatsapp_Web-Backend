import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/connection.js";

class Chats extends Model {}

Chats.init(
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user1_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user2_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Chats",
    tableName: "Chats",
    timestamps: false,
  }
);

export default Chats;
