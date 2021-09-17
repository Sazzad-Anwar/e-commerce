const router = require('express').Router();
const { AccessTokenValidation } = require('auth-middleware-jwt');
const { cart, deleteCart } = require('../controllers/Orders/cart');
const { payment, refundOrder } = require('../controllers/Orders/payment');
const { addShippingAddress, shippingStatus } = require('../controllers/Orders/shipping');


/*
##### @Description: Add a product to cart
##### Route: /api/v1/orders/cart
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
##### Route: /api/v1/orders/cart/:id
##### Method: Delete
##### Access: User
*/
router
    .route('/cart/:id')
    .delete(AccessTokenValidation, deleteCart);


/*
##### @Description: Add shipping address
##### Route: /api/v1/orders/addShippingAddress/:orderId
##### Method: PUT
##### Access: User
*/
router
    .route('/addShippingAddress/:orderId')
    .put(AccessTokenValidation, addShippingAddress)

/*
##### @Description: Proceed to payment
##### Route: /api/v1/orders/payment/:orderId
##### Method: POST, PUT
##### Access: User
*/
router
    .route('/payment/:orderId')
    .put(AccessTokenValidation, payment)



/*
##### @Description: Shipping Status
##### Route: /api/v1/orders/updateShippingStatus/:orderId
##### Method: PUT
##### Access: Vendor
*/
router
    .route('/updateShippingStatus/:orderId')
    .put(AccessTokenValidation, shippingStatus)



/*
##### @Description: Order refund
##### Route: /api/v1/orders/refund/:orderId
##### Method: POST
##### Access: User
*/
router
    .route('/refund/:orderId')
    .put(AccessTokenValidation, refundOrder)


module.exports = router;