const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/checkAuth', authController.requireAuth_get);
router.get('/logout', authController.logout_get);
router.get("/:userId",  authController.userById);
router.put( "/updateUser/:userId", authController.update_user );

module.exports = router