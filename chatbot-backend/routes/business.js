// routes/business.js
const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// POST /api/business - Create a new business
router.post('/', businessController.createBusiness);

// GET /api/business - Get a business by name
router.get('/', businessController.getBusiness);

// GET /api/business/all - Get all businesses
router.get('/all', businessController.getAllBusinesses);

module.exports = router;
