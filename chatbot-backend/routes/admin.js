const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/:businessId', adminController.saveBotConfig);
router.get('/:businessId', adminController.getBotConfig);

module.exports = router;
