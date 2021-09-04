//@Description: Admin routes
const { AccessTokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { login, registration, getVendorDetails, vendorDetailsUpdate, accountActivate, passwordResetEmail, passwordReset, logout } = require('../controllers/VendorController/authController');
const router = express.Router();

/*
##### @Description: Vendor login route
##### Route: /api/v1/vendor/login
##### Method: POST
*/
router
    .route('/login')
    .post(login)

/*
##### @Description: Logout route for all users
##### Route: /api/v1/vendor/logout
##### Method: GET
*/
router
    .route('/logout')
    .get(AccessTokenValidation, logout)


/*
##### @Description: Vendor registration route
##### Route: /api/v1/vendor/registration
##### Method: POST
*/
router
    .route('/registration')
    .post(registration)


//@Description: Vendor details update
//Route: /api/v1/vendor/details
//Method: GET, PUT
router
    .route('/details')
    .get(AccessTokenValidation, getVendorDetails)
    .put(AccessTokenValidation, vendorDetailsUpdate)


/*
##### @Description: Vendor account activate
##### Route: /api/v1/vendor/activate/:_id/:activationId
##### Method: GET
*/
router
    .route('/activate/:_id/:activationId')
    .get(accountActivate)

/*
##### @Description: Vendor password reset
##### Route: /api/v1/vendor/password/reset
##### Method: POST, PUT
*/
router
    .route('/password/reset')
    .post(passwordResetEmail)
    .put(passwordReset)


module.exports = router;