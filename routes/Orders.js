const router = require('express').Router();
const { AccessTokenValidation } = require('auth-middleware-jwt');
const { cart, deleteCart } = require('../controllers/Orders/cart');
const { payment, refundOrder } = require('../controllers/Orders/payment');
const { addShippingAddress, shippingStatus } = require('../controllers/Orders/shipping');
const { hasPermission } = require('../middleware/checkUser');


/*
##### @Description: Add a product to cart
##### Route: /api/v1/orders/cart
##### Method: POST
##### Access: User
*/
router
    .route('/cart')
    .get(AccessTokenValidation, hasPermission(['user']), cart)
    .post(AccessTokenValidation, hasPermission(['user']), cart)
    .put(AccessTokenValidation, hasPermission(['user']), cart)


/*
##### @Description: Delete a product from the cart
##### Route: /api/v1/orders/cart/:id
##### Method: Delete
##### Access: User
*/
router
    .route('/cart/:id')
    .delete(AccessTokenValidation, hasPermission(['user']), deleteCart);


/*
##### @Description: Add shipping address
##### Route: /api/v1/orders/addShippingAddress/:orderId
##### Method: PUT
##### Access: User
*/
router
    .route('/addShippingAddress/:orderId')
    .put(AccessTokenValidation, hasPermission(['user']), addShippingAddress)

/*
##### @Description: Proceed to payment
##### Route: /api/v1/orders/:orderId/payment
##### Method: PUT
##### Access: User
*/
router
    .route('/:orderId/payment')
    .put(AccessTokenValidation, hasPermission(['user']), payment)



/*
##### @Description: Shipping Status
##### Route: /api/v1/orders/updateShippingStatus/:orderId
##### Method: PUT
##### Access: Vendor
*/
router
    .route('/updateShippingStatus/:orderId')
    .put(AccessTokenValidation, hasPermission(['admin', 'superAdmin']), shippingStatus)



/*
##### @Description: Order refund
##### Route: /api/v1/orders/refund/:orderId
##### Method: POST
##### Access: User
*/
router
    .route('/:orderId/refund')
    .put(AccessTokenValidation, hasPermission(['user']), refundOrder)


module.exports = router;