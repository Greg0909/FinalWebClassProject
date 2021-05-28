const express = require('express');
const router = express.Router();

// We use the corresponding controller here to handle the product resource
// Now the routes are simply doing that: re-rerouting the request (including all of their context) to the corresponding controller.
const UserController = require('../controllers/userController');


router.post('/create', UserController.createUser);


module.exports = router;