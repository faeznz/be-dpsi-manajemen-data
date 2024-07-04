const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Endpoint untuk mendapatkan laporan bulanan
router.get('/monthly', reportController.getMonthlyReport);

module.exports = router;
