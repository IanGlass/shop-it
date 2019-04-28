const express = require('express');

const shopCont = require('../controllers/shopCont');

const router = express.Router();

router.get('/', shopCont.getIndex);

router.get('/products', shopCont.getProducts);

router.get('/cart', shopCont.getCart);

// Add a product to the cart
router.post('/cart', shopCont.postCart);

router.post('/cart-delete-item', shopCont.postCartDeleteProduct);

router.get('/checkout', shopCont.getCheckout);

router.get('/orders', shopCont.getOrders);

// Express will now ignore productID but this middleware will get hit if it does not hit anything before
router.get('/products/:productID', shopCont.getProduct);

// Export the router for app.js
module.exports = router;
