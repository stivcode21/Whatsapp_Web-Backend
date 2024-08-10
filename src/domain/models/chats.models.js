const { DataTypes, Model } = require("sequelize");
const { connect } = require("../../infrastructure/database/connection");

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

module.exports = { Chats };
