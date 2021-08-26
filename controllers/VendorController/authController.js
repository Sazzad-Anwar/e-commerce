const Vendor = require('../../models/vendor');
const asyncHandler = require('express-async-handler');
const { getToken } = require('auth-middleware-jwt');

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

    if (vendorExists) {
        res.status(409).json({
            code: 409,
            status: 'failed',
            isSuccess: false,
            message: 'Vendor is already registered'
        })
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
            image
        })

        await newVendor.save();

        let vendor = await Vendor.findOne({ email, NID, phone });

        vendor = {
            _id: vendor._id,
            type: 'vendor'
        }

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            token: await getToken(vendor)
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

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            token: await getToken(vendor)
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
                user: vendorDetails,
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
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Vendor not found'
        })
    }


})

module.exports = {
    registration,
    login,
    getVendorDetails,
    vendorDetailsUpdate
}