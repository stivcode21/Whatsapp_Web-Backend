import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../infrastructure/database/connection.js"

/*const { Chats } = require("./chats.models")
const { Configuration } = require("./configuration.models")
const { Account } = require("./account.models")
const { State } = require("./state.model")*/

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
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    image: {
        type: DataTypes.BLOB
    },
    isNew: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "Users"
})

/*//? Relacion de one-to-many con el modelo de Chats 
User.hasMany(Chats)

//? Relacion de one-to-one con el modelo de Configuration 
User.hasOne(Configuration)

//? Relacion de one-to-one con el modelo de Account 
User.hasOne(Account)

//? Relacion de one-to-one con el modelo de Estado 
User.hasOne(State)*/

export default User 