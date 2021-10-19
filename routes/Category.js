//@Description: Authentication routes
const { AccessTokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { createCategory, getCategories, updateCategory } = require('../controllers/CategoryController/categoryController');
const { vendorAccess } = require('../middleware/checkUser');
const router = express.Router();

/*
##### @Description: Create/Get/Update/Delete category route
##### Route: /api/v1/category/
##### Method: POST,GET,PUT,DELETE
##### Access: Vendor
*/
router
    .route('/')
    .get(getCategories)
    .post(AccessTokenValidation, vendorAccess, createCategory)
    .delete(AccessTokenValidation, vendorAccess, updateCategory)


module.exports = router;