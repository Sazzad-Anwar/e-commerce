const router = require('express').Router();
const { AccessTokenValidation } = require('auth-middleware-jwt');
const { addToCart } = require('../controllers/Orders/addToCart');


/*
##### @Description: Add a product to cart
##### Route: /api/v1/order/cart
##### Method: POST
##### Access: User
*/
router
    .route('/cart')
    .post(AccessTokenValidation, addToCart)


module.exports = router;