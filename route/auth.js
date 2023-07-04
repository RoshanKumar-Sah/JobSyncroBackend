const express = require("express")
const { signup, login } = require("../controller/auth")
const validateSchema = require("../middleware/validateSchema")
const { SignupSchema, LoginSchema } = require("../schema/authSchema")
const router = express.Router()




router.post("/signup", validateSchema(SignupSchema), signup)
router.post("/login", validateSchema(LoginSchema), login)

module.exports = router