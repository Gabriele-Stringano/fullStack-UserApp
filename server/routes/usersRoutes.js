const express = require("express");
const authController = require('../controllers/authController')
const router = express.Router()

router.get("/:userId",  authController.userById);
router.put( "/updateUser/:userId", authController.update_user );

module.exports = router