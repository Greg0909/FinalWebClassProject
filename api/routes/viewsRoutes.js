const express = require('express');
const router = express.Router();

// We use the corresponding controller here to handle the product resource
// Now the routes are simply doing that: re-rerouting the request (including all of their context) to the corresponding controller.
const ViewsController = require('../controllers/viewsController');


router.get('/producteditor', ViewsController.renderProductEditor);

router.get('/productdashboard', ViewsController.renderProductDashboard);

router.get('/productcreation', ViewsController.renderProductCreator);

router.get('/cart', ViewsController.renderProductCart);

router.get('/login', ViewsController.renderLogin);

router.get('/signup', ViewsController.renderSignup);

router.get('/usereditor', ViewsController.renderUserEditor);


module.exports = router;