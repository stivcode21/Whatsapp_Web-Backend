import { Sequelize } from "sequelize";
import { DATABASE, USERNAME, PASSWORD, DB_PORT } from "../../../config.js";

export const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: DB_PORT,
})

export async function connectDB() {
  try {
    await sequelize.authenticate()
  } catch (error) {
    console.log(error)
  }
}