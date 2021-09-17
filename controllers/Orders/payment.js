const Order = require('../../models/order');
const asyncHandler = require('express-async-handler');

/*
##### @Description: Proceed to payment
##### Route: /api/v1/orders/payment/:orderId
##### Method: Delete
##### Access: User
*/
const payment = asyncHandler(async (req, res) => {
    if (req.user.type === 'user') {

        const { orderId } = req.params;
        const {
            paymentMethod, paymentStatus, transactionId
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

            if (paymentMethod !== 'Cash-On-Delivery') {

                order.paymentResult.paymentMethod = paymentMethod;
                order.paymentResult.id = transactionId;
                order.paymentResult.status = paymentStatus;
                order.isPaid = true;
                order.paidAt = new Date();
                order.addToCart = false;
                order.paymentResult.updateTime = new Date();

            } else {

                order.paymentResult.paymentMethod = paymentMethod;
                order.addToCart = false;
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
            message: `Only registered 'user' can access this route`
        })
    }
});


/*
##### @Description: Order refund
##### Route: /api/v1/orders/refund/:orderId
##### Method: POST
##### Access: User
*/
const refundOrder = asyncHandler(async (req, res) => {
    if (req.user.type === 'user') {

        const { orderId } = req.params;
        const { refundReason, images } = req.body;

        let order = await Order.findById(orderId);

        if (order) {

            order.refund.asked = true;
            order.refund.reason = refundReason;
            order.refund.photo = images;

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
            message: `Only registered 'users' can access this route`
        });
    }
});

module.exports = {
    refundOrder,
    payment
}