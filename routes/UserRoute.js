//@Description: Authentication routes
const express = require('express');
const router = express.Router();
const { login, registration, detailsUpdate, getUserDetails, accountActivate } = require('../controllers/UserController');
const protectedRoute = require('../middlewares/authMiddleware');

//@Description: Login route for all users
//Route: /api/v1/user/login
//Method: POST
router
    .route('/login')
    .post(login)


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
    .get(protectedRoute, getUserDetails)
    .put(protectedRoute, detailsUpdate)


/*
##### @Description: User account activate
##### Route: /api/v1/user/:activationId
##### Method: GET
*/
router
    .route('/:activationId')
    .get(accountActivate)


module.exports = router;