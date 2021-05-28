const express = require('express');
const router = express.Router();

// We use the corresponding controller here to handle the product resource
// Now the routes are simply doing that: re-rerouting the request (including all of their context) to the corresponding controller.
const ProductController = require('../controllers/productController');

router.post("/create", ProductController.createProduct);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProduct);

router.delete('/:id', ProductController.deleteProduct);

router.put('/:id', ProductController.updateProduct);

module.exports = router;