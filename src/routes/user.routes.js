const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()


const UserClass = new UserController()

router.get("/user", UserClass.index)
router.post("/user/verify", UserClass.validator_body ,UserClass.verify)


module.exports = router