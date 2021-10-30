const asyncHandler = require('express-async-handler');
const POS = require('../../models/POS');
const Product = require('../../models/products');
const Campaign = require('../../models/campaign');
const updateData = require('../../libs/updateDataModel');

/*
##### @Description: add POS
##### Route: /api/v1/pos
##### Method: POST
##### Access: superAdmin, admin
*/
const addPos = asyncHandler(async (req, res) => {

    let newPos = new POS(req.body);

    let pos = await newPos.save();

    res.status(201).json({
        code: 201,
        isSuccess: true,
        status: 'success',
        data: {
            pos
        }
    });

});


/*
##### @Description: add POS
##### Route: /api/v1/pos
##### Method: POST
##### Access: superAdmin, admin
*/
const getPos = asyncHandler(async (req, res) => {
    if (req.query._id) {
        let pos = await POS.findById(req.query._id);

        if (pos) {
            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                data: {
                    pos
                }
            })
        } else {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `POS ${req.query._id} is not found`
            })
        }
    } else {

        let pos = await POS.find();

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            data: {
                pos
            }
        })

    }
});


/*
##### @Description: Update POS
##### Route: /api/v1/pos
##### Method: PUT
##### Access: superAdmin, admin
*/
const updatePos = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let posExists = await POS.findById(req.query._id);

        let pos = await updateData(req.body, posExists);

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            data: {
                pos
            }
        });
    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: `POS ID is required`
        });
    }
});


/*
##### @Description: Delete POS
##### Route: /api/v1/pos
##### Method: DELETE
##### Access: superAdmin, admin
*/
const deletePos = asyncHandler(async (req, res) => {

    if (req.query._id) {

        let pos = await POS.findById(req.query._id);

        if (pos) {
            await POS.findByIdAndDelete(req.query._id);

            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                message: `POS ${req.query._id} is deleted`
            })
        } else {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `POS ${req.query._id} is not found`
            })
        }

    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: `POS ID is required`
        });
    }
});

module.exports = {
    addPos,
    updatePos,
    getPos,
    deletePos
}