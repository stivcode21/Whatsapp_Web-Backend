import express from "express"
import connectDB from "./db.js"
import { PORT } from "./config.js"

const app = express()

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})