const Vendor = require('../../models/vendor');
const asyncHandler = require('express-async-handler');
const { getAccessToken, getRefreshToken } = require('auth-middleware-jwt');
const { v4: uuid } = require('uuid');
const { emailSender } = require('../../libs/emailSender');
const client = require('../../config/db/Redis');
const util = require('util');
client.get = util.promisify(client.get);

/*
##### @Description: Vendor registration route
##### Route: /api/v1/vendor/registration
##### Method: POST
*/
const registration = asyncHandler(async (req, res) => {
    const {
        name,
        shopName,
        email,
        phone,
        shopAddress,
        division,
        district,
        upaZila,
        ward,
        NID,
        password,
        image
    } = req.body

    let vendorExists = await Vendor.findOne({ $or: [{ email }, { phone }, { NID }] });

    let activationId = uuid();

    if (vendorExists) {
        res.status(409);
        throw new Error('Already Registered')
    } else {
        let newVendor = new Vendor({
            name,
            shopName,
            email,
            phone,
            shopAddress,
            division,
            district,
            upaZila,
            ward,
            NID,
            password,
            image,
            activationId
        })

        await newVendor.save();

        let vendor = await Vendor.findOne({ email, NID, phone });

        let user = {
            _id: vendor._id,
            name,
            email,
            photo: image,
            type: 'vendor'
        }

        let emailData = {
            name: newVendor.name,
            activationId: `${process.env.APP_URL}/vendor/${newVendor._id}/${newVendor.activationId}`,
            email: newVendor.email,
            type: 'Account activation'
        }

        process.env.NODE_ENV === 'production' ? emailSender(emailData) : null

        let accessToken = await getAccessToken(user);
        let refreshToken = await getRefreshToken({ user: vendor._id })

        res.cookie("accessToken", `Bearer ${accessToken}`, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            sameSite: true,
            expires: new Date(Date.now() + process.env.ACCESS_COOKIE_EXPIRES_IN),
            secure: process.env.NODE_ENV === 'production' ? true : false
        });

        // res.cookie("refreshToken", `Bearer ${accessToken}`, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     sameSite: true,
        //     expires: new Date(Date.now() + process.env.REFRESH_COOKIE_EXPIRES_IN),
        //     secure: process.env.NODE_ENV === 'production' ? true : false
        // });

        res.status(201).json({
            code: 201,
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
##### @Description: Vendor login route
##### Route: /api/v1/vendor/login
##### Method: POST
*/
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const vendorExists = await Vendor.findOne({ email });

    if (vendorExists && (await vendorExists.matchPassword(password))) {

        let user = {
            _id: vendorExists._id,
            name: vendorExists.name,
            email: vendorExists.email,
            photo: vendorExists.image,
            type: 'vendor'
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
##### @Description: Vendor logout route
##### Route: /api/v1/vendor/logout
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
##### @Description: Get Vendor Details
##### Route: /api/v1/vendor/details
##### Method: GET
*/
const getVendorDetails = asyncHandler(async (req, res) => {
    console.log(req.user._id);
    let vendorDetails = await Vendor.findOne({ _id: req.user._id }).select(' -password ');

    if (vendorDetails) {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                vendor: vendorDetails,
            }
        })
    } else {
        res.status(404);
        throw new Error('No user found !')
    }

});



/*
##### @Description: Vendor details update
##### Route: /api/v1/vendor/details
##### Method: PUT
*/
const vendorDetailsUpdate = asyncHandler(async (req, res) => {
    const {
        name,
        shopName,
        email,
        phone,
        shopAddress,
        division,
        district,
        upaZila,
        ward,
        NID,
        password,
        image
    } = req.body;

    let vendor = await Vendor.findById(req.user._id);

    if (vendor) {
        vendor.name = name ?? vendor.name;
        vendor.shopName = shopName ?? vendor.shopName;
        vendor.email = email ?? vendor.email;
        vendor.phone = phone ?? vendor.phone;
        vendor.shopAddress = shopAddress ?? vendor.shopAddress;
        vendor.division = division ?? vendor.division;
        vendor.district = district ?? vendor.district;
        vendor.upaZila = upaZila ?? vendor.upaZila;
        vendor.ward = ward ?? vendor.ward;
        vendor.NID = NID ?? vendor.NID;
        vendor.password = password ?? vendor.password;
        vendor.image = image ?? vendor.image;

        await vendor.save()

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
        })

    } else {
        res.status(404);
        throw new Error('No user found !')
    }
})


/*
##### @Description: vendor account activate
##### Route: /api/v1/vendor/activate/:_id/:activationId
##### Method: GET
*/
const accountActivate = asyncHandler(async (req, res) => {
    const { activationId, _id } = req.params;

    let activationInvalid = await Vendor.findOne({ activationId, _id });

    if (activationInvalid) {

        activationInvalid.activationId = '';
        activationInvalid.isActive = true;

        await activationInvalid.save();

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            message: 'Vendor activated',
        })
    } else {
        res.status(404);
        throw new Error('Invalid user activation ID !')
    }
});



/*
##### @Description: Send password reset link in email
##### Route: /api/v1/vendor/password/reset
##### Method: POST
*/
const passwordResetEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const vendorExists = await Vendor.findOne({ email });

    let resetId = uuid();

    if (vendorExists) {

        vendorExists.passwordResetId = resetId;

        await vendorExists.save();

        let emailData = {
            name: vendorExists.name,
            resetLink: `${process.env.APP_URL}/vendor/password/reset/${vendorExists._id}/${resetId}`,
            email: vendorExists.email,
            type: 'Password reset'
        }

        process.env.NODE_ENV === 'production' ? emailSender(emailData) : null

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            message: 'Password reset link has been sent to your email, please check. The link will be valid for 5 minutes only!',
            data: {
                passwordResetLink: `${process.env.APP_URL}/vendor/password/reset/${vendorExists._id}/${resetId}`,
                expiresIn: Date.now() + Number(process.env.PASSWORD_RESET_LINK_VALIDATION_TIME)
            },
        })

        setTimeout(() => {
            vendorExists.passwordResetId = ''
            vendorExists.save()
        }, Number(process.env.PASSWORD_RESET_LINK_VALIDATION_TIME))
    }
});



/*
##### @Description: vendor password reset
##### Route: /api/v1/vendor/password/reset
##### Method: PUT
*/
const passwordReset = asyncHandler(async (req, res) => {
    const { _id, passwordResetId, password } = req.body;

    let vendor = await Vendor.findOne({ _id, passwordResetId });

    if (vendor) {
        vendor.password = password;
        vendor.passwordResetId = '';

        await vendor.save()

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


/*
##### @Description: Renew the refresh & access token
##### Route: /api/v1/user/refresh-token
##### Method: POST
*/
const renewTokens = asyncHandler(async (req, res) => {

    let { id, token } = req.user;

    let userExist = await Vendor.findById({ _id: id }).select('-password');

    let user = {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        photo: userExist.image,
        type: 'vendor'
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
    registration,
    login,
    getVendorDetails,
    vendorDetailsUpdate,
    passwordReset,
    accountActivate,
    passwordResetEmail,
    logout,
    renewTokens
}