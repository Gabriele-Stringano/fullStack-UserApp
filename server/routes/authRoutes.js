const express = require("express");
const authController= require('../controllers/authController')
const router = express.Router()

router.post('/singup', authController.signup_post)

router.post('/login', authController.login_post)

module.exports = router