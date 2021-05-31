/***
 * This file connects with all possible routes handling resources in our server.
 * In this example, we are just using the routes for products.
 * More routes could be added following the same idea.
 * Here, each resource is inside the routes folder.
 */
 const express = require('express');
 const router = express.Router();
 
 router.use('/products', require('./routes/productRoutes'));
 router.use('/users', require('./routes/userRoutes'));
 router.use( require('./routes/viewsRoutes'));
 router.use( require('./routes/loginRoutes'));

 
 module.exports = router;