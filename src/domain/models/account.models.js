const { DataTypes, Model } = require("sequelize");
const { connect } = require("../../infrastructure/database/connection")
const { User } = require("./user.model")

class Account extends Model {}

Account.init({

}, {
    sequelize: connect(),
    tableName: "Cuentas"
})

Account.belongsTo(User)

module.exports = { Account }