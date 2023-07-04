const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/register', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/isAutenticated', authController.isAutenticated_get);

module.exports = router