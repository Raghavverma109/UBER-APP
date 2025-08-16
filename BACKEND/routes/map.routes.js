const express = require('express');
const axios = require('axios');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller')
const { query } = require('express-validator')

// Route 1: Get coordinates from address
router.get('/coords',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authCaptain, mapController.getLatLongFromAddress);
// Route 2: Get distance between two locations

router.get('/distance',
    [
        query('from').isString().withMessage('From address is required'),
        query('to').isString().withMessage('To address is required'),
    ],
    authMiddleware.authCaptain,
    mapController.getDistanceBetweenLocations
);

// Auto-suggestion route
router.get('/suggestions',
    // authMiddleware.authUser,  // or authUser if needed
    query('query').isString().isLength({ min: 2 }),
    mapController.getAddressSuggestions
);

module.exports = router;