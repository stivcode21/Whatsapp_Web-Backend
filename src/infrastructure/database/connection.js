const { Sequelize } = require("sequelize")


const connect = async () => {
  try {
    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD ,{
       dialect: "mysql",
       host: process.env.DB_HOST,
       logging: (...msg) => console.log(msg)
    })
    await sequelize.authenticate()

    await sequelize.sync({ force: true })
    return sequelize;
  } catch (error) {
    console.error('Error connecting Mysql', error.message)
  }
}

module.exports = { connect }

