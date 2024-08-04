import { Router } from "express"
import UserController from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.post("/register", UserController.register)
userRouter.get("/verify-token", UserController.verifyToken)
userRouter.post("/create-profile", UserController.createProfile)
//userRouter.post("/verify", validator_body, verify)

export default userRouter