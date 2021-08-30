//@Description: Authentication routes
const { tokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { createCategory, getCategories, updateCategory } = require('../controllers/CategoryController/categoryController');
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
    .post(tokenValidation, createCategory)
    .put(tokenValidation, updateCategory)


module.exports = router;