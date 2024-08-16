import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/connection.js";

class Status extends Model {}

Status.init(
  {
    status_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    multimedia: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Status",
    tableName: "Status",
  }
);

export default Status;
