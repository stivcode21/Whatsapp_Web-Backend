import express from "express"
import cors from "cors"
import { connectDB } from "./src/infrastructure/database/connection.js"
import userRouter from "./src/routes/user.routes.js"
import { PORT } from "./config.js"
import User from "./src/domain/models/user.model.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/user", userRouter)

connectDB()

try {
  await User.sync({ force: true })
  console.log("Table Users created")
} catch (error) {
  console.log(error)
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})