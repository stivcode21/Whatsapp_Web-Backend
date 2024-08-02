import { Router } from "express"
import UserController from "../controllers/user.controller"

const userRouter = Router()
const { 
  index, 
  validator_body, 
  verify 
} = new UserController()

userRouter.get("/user", index)
userRouter.post("/user/verify", validator_body, verify)

export default userRouter