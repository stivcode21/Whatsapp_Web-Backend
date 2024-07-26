const { DataTypes, Model } = require("sequelize")
const { connect } = require("../../infrastructure/database/connection")
const { User } = require("./user.model")

class Configuration extends Model {}

Configuration.init({

},{
    sequelize: connect(),
    tableName: "Configuracion"
})

Configuration.belongsTo(User)

module.exports = { Configuration }