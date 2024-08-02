import { Sequelize } from "sequelize";
import { DATABASE, USERNAME, PASSWORD, DB_PORT } from "../../../config.js";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: DB_PORT,
})

export default async function connectDB() {
  try {
    await sequelize.authenticate()
    console.log("Connected to DB successfully")
  } catch (error) {
    console.log(error)
  }
}