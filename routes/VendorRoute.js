//@Description: Admin routes
const { tokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { login, registration, getVendorDetails, vendorDetailsUpdate, accountActivate, passwordResetEmail, passwordReset, logout } = require('../controllers/VendorController/authController');
const router = express.Router();
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

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
    .get(tokenValidation, logout)


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
    .get(csrfProtection, tokenValidation, getVendorDetails)
    .put(csrfProtection, tokenValidation, vendorDetailsUpdate)


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