//@Description: Authentication routes
const { AccessTokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/CategoryController/categoryController');
const { hasPermission } = require('../middleware/checkUser');
const router = express.Router();

/*
##### @Description: Create/Get category route
##### Route: /api/v1/category/
##### Method: POST,GET,PUT,DELETE
##### Access: Vendor
*/
router
    .route('/')
    .get(getCategories)
    .post(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), createCategory)


/*
##### @Description: Update category route
##### Route: /api/v1/category/:id/update
##### Method: PUT
##### Access: Vendor
*/
router
    .route('/:id/update')
    .put(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), updateCategory)

/*
##### @Description: Delete category route
##### Route: /api/v1/category/:id/:parent/delete
##### Method: DELETE
##### Access: Vendor
*/
router
    .route('/:id/:parent/delete')
    .delete(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), deleteCategory)


module.exports = router;