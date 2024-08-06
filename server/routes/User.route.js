const express = require("express")
const router = express.Router()

const { signup, login, getUserDetails } = require("../controllers/Auth.controller")

const { auth } = require("../middleware/auth")

router.post("/signup", signup)
router.post("/login", login)
router.get("/getUserDetails", auth, getUserDetails)


module.exports = router