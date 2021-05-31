const express = require('express');
const router = express.Router();

// We use the corresponding controller here to handle the product resource
// Now the routes are simply doing that: re-rerouting the request (including all of their context) to the corresponding controller.
const CompletePurchaseController = require('../controllers/completePurchaseController');


router.post('/completePurchase', CompletePurchaseController.completePurchase);


module.exports = router;