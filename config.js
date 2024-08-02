import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000
const DATABASE = process.env.DATABASE
const USERNAME = process.env.DATABASE_USER
const PASSWORD = process.env.DATABASE_PASSWORD
const DB_PORT = process.env.DATABASE_PORT

export {
  PORT,
  DATABASE,
  USERNAME,
  PASSWORD,
  DB_PORT
}