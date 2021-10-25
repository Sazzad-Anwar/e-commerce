//@Description: Admin routes
const { AccessTokenValidation, RefreshTokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const {
    login,
    registration,
    getVendorDetails,
    vendorDetailsUpdate,
    accountActivate,
    passwordResetEmail,
    passwordReset,
    logout,
    renewTokens
} = require('../controllers/VendorController/authController');
const { addCampaign, updateCampaign, getCampaign, deleteCampaign } = require('../controllers/VendorController/campaign');
const { addStore, getStore, updateStoreDetails, deleteStore } = require('../controllers/VendorController/store');
const { hasPermission } = require('../middleware/checkUser');
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
    .get(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), getVendorDetails)
    .put(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), vendorDetailsUpdate)


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


/*
##### @Description: Renew the refresh & access token
##### Route: /api/v1/vendor/refresh-token
##### Method: POST
*/
router
    .route('/refresh-token')
    .post(RefreshTokenValidation, renewTokens)


/*
##### @Description: Add/Update/delete/Get stores
##### Route: /api/v1/vendor/store
##### Method: GET/POST/PUT/DELETE
##### Access: admin, superAdmin
*/
router
    .route('/store')
    .get(AccessTokenValidation, hasPermission(['admin', 'superAdmin']), getStore)
    .post(AccessTokenValidation, hasPermission(['admin', 'superAdmin']), addStore)
    .put(AccessTokenValidation, hasPermission(['admin', 'superAdmin']), updateStoreDetails)
    .delete(AccessTokenValidation, hasPermission(['admin', 'superAdmin']), deleteStore);


/*
##### @Description: Add/update/get/delete campaign
##### Route: /api/v1/vendor/campaign?_id=
##### Method: GET/POST/PUT/DELETE
##### Access: superAdmin
*/
router
    .route('/campaign')
    .get(AccessTokenValidation, hasPermission(['superAdmin']), getCampaign)
    .post(AccessTokenValidation, hasPermission(['superAdmin']), addCampaign)
    .put(AccessTokenValidation, hasPermission(['superAdmin']), updateCampaign)
    .delete(AccessTokenValidation, hasPermission(['superAdmin']), deleteCampaign);


module.exports = router;