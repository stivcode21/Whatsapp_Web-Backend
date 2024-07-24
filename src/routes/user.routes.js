const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()


const UserClass = new UserController()

router.get('/test',)
router.get("/user", UserClass.index)
router.get("/probando", UserClass.probando)
router.post('/createUser', UserClass.createUser)
router.get('/allUsers', UserClass.getUsers);
router.post("/user/verify", UserClass.validator_body ,UserClass.verify)


module.exports = router