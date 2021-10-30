const Vendor = require('../../models/vendor');
const Campaign = require('../../models/campaign');
const asyncHandler = require('express-async-handler');
/*
##### @Description: Add campaign
##### Route: /api/v1/vendor/campaign
##### Method: POST
##### Access: superAdmin
*/
const addCampaign = asyncHandler(async (req, res) => {

    let campaignExists = await Campaign.findOne({ product });

    if (campaignExists && campaignExists.status) {
        res.status(409).json({
            code: 409,
            status: 'failed',
            isSuccess: false,
            message: `This campaign is already running`
        });
    } else {
        let newCampaign = new Campaign(req.body);

        let campaign = await newCampaign.save();

        res.status(201).json({
            code: 201,
            status: 'success',
            isSuccess: true,
            data: {
                campaign
            }
        })
    }
})



/*
##### @Description: Update campaign
##### Route: /api/v1/vendor/campaign?_id=
##### Method: PUT
##### Access: superAdmin
*/
const updateCampaign = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let campaignExists = await Campaign.findById(req.query._id);

        if (!campaignExists) {
            res.status(404).json({
                code: 409,
                status: 'failed',
                isSuccess: false,
                message: `The campaign ${req.query._id} is not found`
            });
        } else {

            let campaign = await updateData(req.body, campaignExists)

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    campaign
                }
            })
        }
    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: 'Campaign ID needs for requesting to this route'
        })
    }

});


/*
##### @Description: Get campaign
##### Route: /api/v1/vendor/campaign?_id=
##### Method: GET
##### Access: superAdmin
*/
const getCampaign = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let campaign = await Campaign.findById(req.query._id);

        if (campaign) {
            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                data: {
                    campaign
                }
            })
        } else {
            res.status(404).json({
                status: 'failed',
                isSuccess: false,
                code: 404,
                message: `Campaign ${req.query._id} is not found`
            })
        }

    } else {

        let campaign = await Campaign.find();

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            data: {
                campaign
            }
        })
    }
});

/*
##### @Description: Get campaign
##### Route: /api/v1/vendor/campaign?_id=
##### Method: DELETE
##### Access: superAdmin
*/
const deleteCampaign = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let campaign = await Campaign.findById(req.query._id);

        if (campaign) {
            await Campaign.findByIdAndDelete(req.query._id);

            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                message: `Campaign ${req.query._id} is deleted`
            })
        } else {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `Campaign ${req.query._id} is not found`
            })
        }


    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: 'Campaign ID needs for requesting to this route'
        })
    }
});

module.exports = {
    addCampaign,
    updateCampaign,
    getCampaign,
    deleteCampaign
}