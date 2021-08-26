const asyncHandler = require('express-async-handler');
const Users = require('../models/user');
const { getToken } = require('auth-middleware-jwt');
const { v4: uuid } = require('uuid');


//##### Description: Controller of Login route for all users
//##### Route: /api/v1/user/login
//##### Method: POST

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let userExists = await Users.findOne({ email });

    if (userExists && (await userExists.matchPassword(password))) {
        let user = {
            _id: userExists._id,
        }

        let token = await getToken(user);

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            token
        })

    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Credentials do not match'
        })
    }
});


/*
##### @Description:Controller of Registration route for user
##### Route: /api/v1/user/registration
##### Method: POST
*/
const registration = asyncHandler(async (req, res) => {

    const { name, email, phone, address, password, photo, isAdmin } = req.body;

    let userRegistered = await Users.findOne({ $or: [{ email }, { phone }] });

    if (userRegistered) {

        res.status(409).json({
            code: 409,
            status: 'failed',
            isSuccess: false,
            message: 'Already registered !'
        })

    } else {

        let newUser = new Users({
            name, email, phone, address, password, photo, isAdmin, activationId: uuid()
        });

        await newUser.save();

        let user = await Users.findOne({
            email, phone
        });

        user = {
            _id: user._id,
        }

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            token: await getToken(user)
        })
    }
})

/*
##### @Description: Get User Details
##### Route: /api/v1/user/details
##### Method: GET
*/
const getUserDetails = asyncHandler(async (req, res) => {

    let userDetails = await Users.findById(req.user).select(' -password ');

    if (userDetails) {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                user: userDetails,
            }
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'User is not found'
        })
    }

});


/*
##### @Description: User details update
##### Route: /api/v1/user/details
##### Method: PUT
*/
const detailsUpdate = asyncHandler(async (req, res) => {

    const { name, email, phone, address, password, photo } = req.body;

    let user = await Users.findById(req.user);

    if (user) {
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.address = address ?? user.address;
        user.password = password ?? user.password;
        user.photo = photo ?? user.photo;

        await user.save()

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
        })

    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'User not found'
        })
    }

});


/*
##### @Description: User account activate
##### Route: /api/v1/user/:activationId
##### Method: GET
*/
const accountActivate = asyncHandler(async (req, res) => {
    const { activationId } = req.params;

    let activationInvalid = await Users.findOne({ activationId, _id: req.params });

    if (activationInvalid) {

        activationInvalid.activationId = '';
        activationInvalid.isActive = true;

        await activationInvalid.save();

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            message: 'User activated',
        })
    } else {
        res.json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'User activation ID is invalid',
        })
    }


});


module.exports = {
    login,
    registration,
    detailsUpdate,
    accountActivate,
    getUserDetails
}