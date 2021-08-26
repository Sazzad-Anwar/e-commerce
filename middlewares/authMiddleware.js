const { tokenValidation } = require('auth-middleware-jwt');
const asyncHandler = require('express-async-handler');
const Users = require('../models/user');

const protectedRoute = asyncHandler(tokenValidation, async (req, res, next) => {

    let user = await Users.findById(req.user);

    if (user) {
        next()
    }
    throw Error('Access denied!')
})

module.exports = protectedRoute;