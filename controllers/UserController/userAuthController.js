const asyncHandler = require('express-async-handler');
const Users = require('../../models/user');
const { getAccessToken, getRefreshToken } = require('auth-middleware-jwt');
const { v4: uuid } = require('uuid');
const { emailSender } = require('../../libs/emailSender');
const client = require('../../config/db/Redis');
const util = require('util');
client.get = util.promisify(client.get);


//##### Description: Controller of Login route for all users
//##### Route: /api/v1/user/login
//##### Method: POST

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    let userExists = await Users.findOne({ email });

    if (userExists && (await userExists.matchPassword(password))) {
        let user = {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            photo: userExists.photo,
            type: 'user'
        }

        let accessToken = await getAccessToken(user);
        let refreshToken = await getRefreshToken({ user: user._id })

        client.set(user._id.toString(), refreshToken);

        res.cookie("accessToken", `Bearer ${accessToken}`, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            sameSite: true,
            expires: new Date(Date.now() + process.env.ACCESS_COOKIE_EXPIRES_IN),
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        // res.cookie("refreshToken", `Bearer ${refreshToken}`, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     sameSite: true,
        //     expires: new Date(Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN),
        //     secure: process.env.NODE_ENV === 'production' ? true : false
        // });

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                isLoggedIn: true,
                accessToken,
                refreshToken
            }
        })

    } else {
        res.status(404)
        throw new Error('Login failed !')
    }
});


/* 
##### @Description: Logout route for all users
##### Route: /api/v1/user/logout
##### Method: GET
*/
const logout = asyncHandler(async (req, res) => {

    client.del(req.user._id.toString())

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({
        code: 200,
        status: 'success',
        isSuccess: true,
        message: 'Logged Out'
    });
});


/*
##### @Description: Controller of Registration route for user and send an email to user for account activation
##### Route: /api/v1/user/registration
##### Method: POST
*/
const registration = asyncHandler(async (req, res) => {

    const { name, email, phone, address, password, photo } = req.body;
    let activationId = uuid()

    let userRegistered = await Users.findOne({ $or: [{ email }, { phone }] });

    if (userRegistered) {

        res.status(409);
        throw new Error('Already Registered')

    } else {

        let newUser = new Users({
            name, email, phone, address, password, photo, activationId
        });

        await newUser.save();

        let user = await Users.findOne({
            email, phone
        });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            type: 'user',
        }

        let emailData = {
            name: newUser.name,
            activationId: `${process.env.APP_URL}/user/${newUser._id}/${newUser.activationId}`,
            email: newUser.email,
            type: 'Account activation'
        }

        process.env.NODE_ENV === 'production' ? emailSender(emailData) : null

        let accessToken = await getAccessToken(user);
        let refreshToken = await getRefreshToken({ user: user._id })

        res.cookie("accessToken", `Bearer ${accessToken}`, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            expires: new Date(Date.now() + process.env.ACCESS_COOKIE_EXPIRES_IN),
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        // res.cookie("refreshToken", `Bearer ${refreshToken}`, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     expires: new Date(Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN),
        //     secure: process.env.NODE_ENV === 'production' ? true : false
        // });

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                isLoggedIn: true,
                accessToken,
                refreshToken
            }
        })
    }
});



/*
##### @Description: Get User Details
##### Route: /api/v1/user/details
##### Method: GET
*/
const getUserDetails = asyncHandler(async (req, res) => {
    let userDetails = await Users.findById(req.user._id).select(' -password ');

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
        res.status(404);
        throw new Error('No user found !')
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
        res.status(404);
        throw new Error('No user found !')
    }

});


/*
##### @Description: User account activate
##### Route: /api/v1/user/activate/:_id/:activationId
##### Method: GET
*/
const accountActivate = asyncHandler(async (req, res) => {
    const { activationId, _id } = req.params;

    let activationInvalid = await Users.findOne({ activationId, _id });

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
        res.status(404);
        throw new Error('Invalid user ID or activation ID !')
    }
});



/*
##### @Description: Send password reset link in email
##### Route: /api/v1/user/password/reset
##### Method: POST
*/
const passwordResetEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const userExists = await Users.findOne({ email });

    let resetId = uuid();

    if (userExists) {

        userExists.passwordResetId = resetId;

        await userExists.save();

        let emailData = {
            name: userExists.name,
            resetLink: `${process.env.APP_URL}/user/password/reset/${userExists._id}/${resetId}`,
            email: userExists.email,
            type: 'Password reset'
        }

        process.env.NODE_ENV === 'production' ? emailSender(emailData) : null

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            message: 'Password reset link has been sent to your email, please check. The link will be valid for 5 minutes only!',
            data: {
                passwordResetLink: `${process.env.APP_URL}/user/password/reset/${userExists._id}/${resetId}`,
                expiresIn: Date.now() + Number(process.env.PASSWORD_RESET_LINK_VALIDATION_TIME)
            },
        })

        setTimeout(() => {
            userExists.passwordResetId = ''
            userExists.save()
        }, Number(process.env.PASSWORD_RESET_LINK_VALIDATION_TIME))
    } else {
        res.status(404);
        throw new Error('User is not found');
    }
});



/*
##### @Description: User password reset
##### Route: /api/v1/user/password/reset
##### Method: PUT
*/
const passwordReset = asyncHandler(async (req, res) => {
    const { _id, passwordResetId, password } = req.body;

    let user = await Users.findOne({ _id, passwordResetId });

    if (user) {
        user.password = password;
        user.passwordResetId = '';

        await user.save()

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            message: 'Password updated'
        })
    } else {
        res.status(404);
        throw new Error('Invalid user or password reset link !')
    }

});



/*
##### @Description: Renew the refresh & access token
##### Route: /api/v1/user/refresh-token
##### Method: POST
*/
const renewTokens = asyncHandler(async (req, res) => {

    let { id, token } = req.user;

    let userExist = await Users.findById({ _id: id }).select('-password');

    let user = {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        photo: userExist.photo,
        type: 'user'
    }

    let redisToken = await client.get(id);

    if (redisToken === token) {

        let accessToken = await getAccessToken(user);
        let refreshToken = await getRefreshToken({ user: user._id.toString() });

        await client.set(user._id.toString(), refreshToken);

        res.cookie("accessToken", `Bearer ${accessToken}`, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            sameSite: true,
            expires: new Date(Date.now() + process.env.ACCESS_COOKIE_EXPIRES_IN),
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        // res.cookie("refreshToken", `Bearer ${refreshToken}`, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     sameSite: true,
        //     expires: new Date(Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN),
        //     secure: process.env.NODE_ENV === 'production' ? true : false
        // });

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                isLoggedIn: true,
                accessToken,
                refreshToken
            }
        })

    } else {
        res.status(403);
        throw new Error('Invalid token')
    }
});

module.exports = {
    login,
    registration,
    detailsUpdate,
    accountActivate,
    getUserDetails,
    passwordResetEmail,
    passwordReset,
    logout,
    renewTokens
}