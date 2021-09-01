const asyncHandler = require('express-async-handler');
const Users = require('../../models/user');
const { getToken } = require('auth-middleware-jwt');
const { v4: uuid } = require('uuid');
const { emailSender } = require('../../libs/emailSender');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });


//##### Description: Controller of Login route for all users
//##### Route: /api/v1/user/login
//##### Method: POST

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    let userExists = await Users.findOne({ email });

    if (userExists && (await userExists.matchPassword(password))) {
        let user = {
            _id: userExists._id,
            type: 'user'
        }

        let token = await getToken(user);

        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                token,
                // csrfToken: req.csrfToken()
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
    res.clearCookie('token');
    res.clearCookie('_csrf');
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
            type: 'user',
        }

        let emailData = {
            name: newUser.name,
            activationId: `${process.env.APP_URL}/user/${newUser._id}/${newUser.activationId}`,
            email: newUser.email,
            type: 'Account activation'
        }

        process.env.NODE_ENV === 'production' ? emailSender(emailData) : null

        let token = await getToken(user);

        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                token
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
        throw new Error('Invalid user activation ID !')
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

        // emailSender(emailData);

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
        throw new Error('Invalid link !')
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
    logout
}