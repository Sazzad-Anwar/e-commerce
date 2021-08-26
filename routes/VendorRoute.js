//@Description: Admin routes
const { tokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const { login, registration, getVendorDetails, vendorDetailsUpdate } = require('../controllers/VendorController/authController');
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
    .get(tokenValidation, getVendorDetails)
    .put(tokenValidation, vendorDetailsUpdate)


module.exports = router;