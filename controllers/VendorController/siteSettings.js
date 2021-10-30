const SiteSetting = require('../../models/siteSetting');
const asyncHandler = require('express-async-handler');
const updateData = require('../../libs/updateDataModel');

/*
##### @Description: Add/ site Settings
##### Route: /api/v1/site-settings
##### Method: GET
##### Access: superAdmin
*/
const addSiteSettings = asyncHandler(async (req, res) => {
    const {
        siteName,
        siteDescription,
        seo,
        email,
        paymentMethod,
        playStoreURL,
        brandLogo,
        termsCondition,
        privacyPolicy,
        brandColor
    } = req.body;

    let newSiteSettings = new SiteSetting({
        siteName,
        siteDescription,
        seo,
        email,
        paymentMethod,
        playStoreURL,
        brandLogo,
        termsCondition,
        privacyPolicy,
        brandColor
    });

    let siteSettings = await newSiteSettings.save();

    res.status(201).json({
        code: 201,
        isSuccess: true,
        status: 'success',
        data: {
            siteSettings
        }
    });

});



/*
##### @Description: Update site Settings
##### Route: /api/v1/site-settings
##### Method: PUT
##### Access: superAdmin
*/
const updateSiteSettings = asyncHandler(async (req, res) => {
    if (req.query._id) {

        let siteSettingsExists = await SiteSetting.findById(req.query._id);

        if (siteSettingsExists) {

            let updatedSettings = await updateData(req.body, siteSettingsExists)

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    siteSettings: updatedSettings
                }
            })

        } else {
            res.status(404).json({
                code: 404,
                status: 'failed',
                isSuccess: false,
                message: `Site-setting ${req.query._id} is not found`
            })
        }

    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: `Site-setting ID is required`
        })
    }
});


/*
##### @Description: Get site Settings
##### Route: /api/v1/site-settings
##### Method: GET
##### Access: superAdmin
*/
const getSiteSettings = asyncHandler(async (req, res) => {

    const siteSettings = await SiteSetting.find();

    res.json({
        code: 200,
        isSuccess: true,
        status: 'success',
        data: {
            siteSettings: siteSettings[0]
        }
    })

});

module.exports = {
    updateSiteSettings,
    addSiteSettings,
    getSiteSettings
}