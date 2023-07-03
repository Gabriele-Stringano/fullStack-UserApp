const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/auth/register', authController.signup_post);
router.post('/auth/login', authController.login_post);
router.get('/checkAuth', authController.requireAuth_get);
router.get('/auth/logout', authController.logout_get);
router.get("/users/:userId",  authController.userById);
router.put( "/users/updateUser/:userId", authController.update_user );

module.exports = router