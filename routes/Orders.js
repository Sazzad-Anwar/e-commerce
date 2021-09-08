const router = require('express').Router();
const { AccessTokenValidation } = require('auth-middleware-jwt');
const { cart, deleteCart } = require('../controllers/Orders/addToCart');


/*
##### @Description: Add a product to cart
##### Route: /api/v1/order/cart
##### Method: POST
##### Access: User
*/
router
    .route('/cart')
    .get(AccessTokenValidation, cart)
    .post(AccessTokenValidation, cart)
    .put(AccessTokenValidation, cart)


/*
##### @Description: Delete a product from the cart
##### Route: /api/v1/order/cart/:id
##### Method: Delete
##### Access: User
*/
router
    .route('/cart/:id')
    .delete(AccessTokenValidation, deleteCart);


module.exports = router;