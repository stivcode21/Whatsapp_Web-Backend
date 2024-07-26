const { DataTypes ,Model } = require("sequelize");
const { connect } = require("../../infrastructure/database/connection");
const { User } = require("./user.model");


class State extends Model {}

State.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false
    }, 
    state_options: {
        type: DataTypes.ENUM,
        values: ["Conectado", "Desconectado", "No Disponible"]
    }
},{
    sequelize: connect(),
    tableName: "Estados"
})

State.belongsTo(User) //* foreign userId

module.exports = { State }