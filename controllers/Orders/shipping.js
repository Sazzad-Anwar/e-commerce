const Order = require('../../models/order');
const asyncHandler = require('express-async-handler');
const { v4: uuid } = require('uuid');

/*
##### @Description: Add shipping address
##### Route: /api/v1/orders/addShippingAddress/:orderId
##### Method: PUT
##### Access: User
*/
const addShippingAddress = asyncHandler(async (req, res) => {

    if (req.user.type === 'user') {

        const { orderId } = req.params;
        const {
            address, city, district, division
        } = req.body;

        let order = await Order.findById(orderId).populate({
            path: 'orderItem',
            populate: [
                {
                    path: 'vendor',
                    select: "shopName"
                },
                {
                    path: 'product',
                    select: 'category name',
                    populate: {
                        path: 'category',
                        select: 'category subCategory item'
                    }
                }
            ]
        });

        if (order) {

            order.shippingAddress.address = address;
            order.shippingAddress.city = city;
            order.shippingAddress.district = district;
            order.shippingAddress.division = division;

            let orderUpdated = await order.save();

            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                data: {
                    order: orderUpdated
                }
            })
        } else {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `Order ${orderId} is not found !`
            })
        }



    } else {
        res.status(400).json({
            code: 400,
            isSuccess: false,
            status: 'failed',
            message: `Only registered 'user' can access this route`
        })
    }
});


/*
##### @Description: Shipping Status
##### Route: /api/v1/orders/updateShippingStatus/:orderId
##### Method: PUT
##### Access: Vendor
*/
const shippingStatus = asyncHandler(async (req, res) => {

    if (req.user.type === 'vendor') {

        const { orderId } = req.params;
        const { shippingStatus } = req.body;

        let order = await Order.findById(orderId);

        if (order) {

            if (shippingStatus === 'DELIVERED') {

                order.shippingStatus = shippingStatus;
                order.isDelivered = true;
                order.deliveredAt = new Date();

                if (order.paymentResult.paymentMethod === 'Cash-On-Delivery') {
                    order.paymentResult.id = uuid();
                    order.paymentResult.status = 'success';
                    order.paymentResult.updateTime = new Date();
                }

            } else {

                order.shippingStatus = shippingStatus;
            }

            let orderUpdated = await order.save();

            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                data: {
                    order: orderUpdated
                }
            });

        } else {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `Order ${orderId} is not found !`
            });
        }
    } else {
        res.status(400).json({
            code: 400,
            isSuccess: false,
            status: 'failed',
            message: `Only registered 'vendors' can access this route`
        })
    }
});


module.exports = {
    addShippingAddress,
    shippingStatus
}