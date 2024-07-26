const { DataTypes, Model } = require("sequelize")
const { connect } = require("../../infrastructure/database/connection")
const { Chats } = require("./chats.models")

//? Se tiene que agregar foreign de usuarios.
class Messages extends Model {}

Messages.init({

}, {
  sequelize: connect(),
  tableName: "Mensajes"
})

Messages.belongsTo(Chats)

module.exports = { Messages}