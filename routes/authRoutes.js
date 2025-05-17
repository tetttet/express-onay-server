const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Регистрация
router.post("/register", registerUser);

// Вход
router.post("/login", loginUser);

module.exports = router;
