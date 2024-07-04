const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registrasi pengguna baru
router.post('/register', authController.register);

// Login pengguna
router.post('/login', authController.login);

module.exports = router;
