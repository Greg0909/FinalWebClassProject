const express = require('express');
const router = express.Router();

// We use the corresponding controller here to handle the product resource
// Now the routes are simply doing that: re-rerouting the request (including all of their context) to the corresponding controller.
const LoginController = require('../controllers/loginController');


router.post('/login', LoginController.logUser);


module.exports = router;