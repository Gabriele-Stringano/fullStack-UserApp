const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router()

router.get("/users/:userId",  authController.userById);
router.put( "/users/updateUser/:userId", authController.update_user );

module.exports = router