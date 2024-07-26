const { DataTypes, Model } = require("sequelize")
const { connect } = require("../../infrastructure/database/connection")
const { Chats } = require("./chats.models")
const { Configuration } = require("./configuration.models")
const { Account } = require("./account.models")
const { State } = require("./state.model")

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(70),
        allowNull: false, 
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    sequelize: connect(),
    tableName: "Usuarios",
})

//? Relacion de one-to-many con el modelo de Chats 
User.hasMany(Chats)

//? Relacion de one-to-one con el modelo de Configuration 
User.hasOne(Configuration)

//? Relacion de one-to-one con el modelo de Account 
User.hasOne(Account)

//? Relacion de one-to-one con el modelo de Estado 
User.hasOne(State)

module.exports = { User } 