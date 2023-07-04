const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/auth/register', authController.signup_post);
router.post('/auth/login', authController.login_post);
router.get('/auth/logout', authController.logout_get);
router.get('/auth/isAutenticated', authController.isAutenticated_get);

module.exports = router