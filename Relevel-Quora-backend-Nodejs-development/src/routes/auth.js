const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const validator = require("../validator/auth");

// Create routes for user here

router.post("/register", validator.userLogin, AuthController.register);
router.post("/login", validator.userLogin, AuthController.login);
module.exports = router;
