const Advertise = require('../../models/ad');
const asyncHandler = require('express-async-handler');
/*
##### @Description: Add advertise for product or others
##### Route: /api/v1/advertise
##### Method: POST
##### Access: superAdmin
*/
const addAdvertise = asyncHandler(async (req, res) => {
    let {
        title,
        redirectURL,
        image,
        status
    } = req.body;

    let newAd = new Advertise({
        title,
        redirectURL,
        image,
        status
    })

    let advertise = await newAd.save();

    res.json({
        code: 201,
        status: 'success',
        isSuccess: true,
        data: {
            advertise
        }
    })
})

/*
##### @Description: Get advertise for product or others
##### Route: /api/v1/advertise
##### Method: GET
##### Access: superAdmin
*/
const getAdvertise = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let advertise = await Advertise.findById(req.query._id);

        if (advertise) {
            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    advertise
                }
            })
        } else {
            res.status(404).json({
                code: 404,
                status: 'failed',
                isSuccess: false,
                message: `Advertise ${req.query._id} is not found`
            })
        }
    } else {

        let advertise = await Advertise.find();

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                advertise
            }
        })
    }
});


/*
##### @Description: Update advertise for product or others
##### Route: /api/v1/advertise
##### Method: PUT
##### Access: superAdmin
*/
const updateAdvertise = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let {
            title,
            redirectURL,
            image,
            status
        } = req.body;

        let ad = await Advertise.findById(req.query._id);

        if (ad) {

            ad.title = title ?? ad.title;
            ad.image = image ?? ad.image;
            ad.redirectURL = redirectURL ?? ad.redirectURL;
            ad.status = status ?? ad.status;

            let advertise = await ad.save();

            res.json({
                code: 201,
                status: 'success',
                isSuccess: true,
                data: {
                    advertise
                }
            })
        } else {
            res.status(404).json({
                code: 404,
                status: 'failed',
                isSuccess: false,
                message: `Advertise ${req.query._id} is not found`
            })
        }


    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: `Advertise ID is required`
        })
    }
})


/*
##### @Description: Delete advertise for product or others
##### Route: /api/v1/advertise
##### Method: DELETE
##### Access: superAdmin
*/
const deleteAdvertise = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let ad = await Advertise.findById(req.query._id);

        if (ad) {

            await Advertise.findByIdAndDelete(req.query._id);

            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                message: `Advertise ${req.query._id} is deleted`
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
            message: `Advertise ID is required`
        })
    }
})


module.exports = {
    addAdvertise,
    getAdvertise,
    deleteAdvertise,
    updateAdvertise
}