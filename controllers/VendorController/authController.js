const Vendor = require('../../models/vendor');
const asyncHandler = require('express-async-handler');
const { getToken } = require('auth-middleware-jwt');
const { v4: uuid } = require('uuid');
const { emailSender } = require('../../libs/emailSender');

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

        vendor = {
            _id: vendor._id,
            type: 'vendor'
        }

        let token = await getToken(vendor);

        let emailData = {
            name: newVendor.name,
            activationId: `${process.env.APP_URL}/vendor/${newVendor._id}/${newVendor.activationId}`,
            email: newVendor.email,
            type: 'Account activation'
        }

        process.env.NODE_ENV === 'production' ? emailSender(emailData) : null

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
##### @Description: Vendor login route
##### Route: /api/v1/vendor/login
##### Method: POST
*/
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const vendorExists = await Vendor.findOne({ email });

    if (vendorExists && (await vendorExists.matchPassword(password))) {

        let vendor = {
            _id: vendorExists._id
        }

        let token = await getToken(vendor);

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
    res.clearCookie('token');
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

    let vendorDetails = await Vendor.findById(req.user._id).select(' -password ');

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

module.exports = {
    registration,
    login,
    getVendorDetails,
    vendorDetailsUpdate,
    passwordReset,
    accountActivate,
    passwordResetEmail,
    logout
}