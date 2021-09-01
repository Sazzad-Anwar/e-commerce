//@Description: Authentication routes
const { tokenValidation } = require('auth-middleware-jwt');
const express = require('express');
const router = express.Router();
const {
    login,
    registration,
    detailsUpdate,
    getUserDetails,
    accountActivate,
    passwordResetEmail,
    passwordReset,
    logout
} = require('../controllers/UserController/userAuthController');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });



//@Description: Login route for all users
//Route: /api/v1/user/login
//Method: POST
router
    .route('/login')
    .post(login)


//@Description: Logout route for all users
//Route: /api/v1/user/logout
//Method: GET
router
    .route('/logout')
    .get(tokenValidation, logout)


//@Description: Registration route for user
//Route: /api/v1/user/registration
//Method: POST
router
    .route('/register')
    .post(registration)

//@Description: User details update
//Route: /api/v1/user/details
//Method: PUT
router
    .route('/details/')
    .get(csrfProtection, tokenValidation, getUserDetails)
    .put(csrfProtection, tokenValidation, detailsUpdate)


/*
##### @Description: User account activate
##### Route: /api/v1/user/activate/:_id/:activationId
##### Method: GET
*/
router
    .route('/activate/:_id/:activationId')
    .get(accountActivate)

/*
##### @Description: User password reset
##### Route: /api/v1/user/password/reset
##### Method: POST, PUT
*/
router
    .route('/password/reset')
    .post(passwordResetEmail)
    .put(passwordReset)

module.exports = router;