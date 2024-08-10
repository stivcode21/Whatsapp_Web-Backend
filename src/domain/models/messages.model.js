import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/connection.js";

//? Se tiene que agregar foreign de usuarios.
class Messages extends Model {}

Messages.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    multimedia: {
      type: DataTypes.BLOB,
    },
    dataSent: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "Messages",
    timestamps: false,
  }
);

export default Messages;
