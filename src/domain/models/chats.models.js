const { DataTypes, Model } = require("sequelize")
const { connect } = require("../../infrastructure/database/connection")
const { User } = require("./user.model")
const { Messages } = require("./messages.model")

class Chats extends Model {}

Chats.init()
Chats.belongsTo(User)

Chats.hasMany(Messages)

module.exports = { Chats }