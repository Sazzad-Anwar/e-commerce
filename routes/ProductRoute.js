//@Description: Authentication routes
const { AccessTokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const {
    addProduct,
    getProducts,
    addReview,
    getReview,
    updateReview,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/ProductController/productController');
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
    .post(AccessTokenValidation, addProduct)



/*
##### @Description:Get or Update a specific product
##### Route: /api/v1/products/:id
##### Method: GET, PUT
##### Access: Vendor, Users
*/
router
    .route('/:id')
    .get(getProduct)
    .put(AccessTokenValidation, updateProduct)
    .delete(AccessTokenValidation, deleteProduct)


/*
##### @Description: Write review route
##### Route: /api/v1/products/review/:product
##### Method: POST
##### Access: Users
*/
router
    .route('/review/:product')
    .post(AccessTokenValidation, addReview)


/*
##### @Description: Get a specific review
##### Route: /api/v1/products/review/:id
##### Method: GET
##### Access: Vendor
*/
router
    .route('/review/:id')
    .get(AccessTokenValidation, getReview)
    .put(AccessTokenValidation, updateReview)


module.exports = router;