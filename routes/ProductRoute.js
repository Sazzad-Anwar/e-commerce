//@Description: Authentication routes
const { tokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { addProduct, getProducts, addReview, getReview, updateReview } = require('../controllers/ProductController/productController');
const router = express.Router();

/*
##### @Description: Get Products, Add products
##### Route: /api/v1/products
##### Method: POST,GET
##### Access: Vendor, Users
*/
router
    .route('/')
    .get(getProducts)
    .post(tokenValidation, addProduct)


/*
##### @Description: Write review route
##### Route: /api/v1/products/review/:product
##### Method: POST
##### Access: Users
*/
router
    .route('/review/:product')
    .post(tokenValidation, addReview)


/*
##### @Description: Get a specific review
##### Route: /api/v1/products/review/:id
##### Method: GET
##### Access: Vendor
*/
router
    .route('/review/:id')
    .get(tokenValidation, getReview)
    .put(tokenValidation, updateReview)


module.exports = router;