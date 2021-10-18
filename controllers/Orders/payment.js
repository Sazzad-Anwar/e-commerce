const Order = require('../../models/order');
const asyncHandler = require('express-async-handler');
const Products = require('../../models/products');
const { v4: uuidV4 } = require('uuid');
const { emailSender } = require('../../libs/emailSender');

/*
##### @Description: Proceed to payment
##### Route: /api/v1/orders/:orderId/payment
##### Method: PUT
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

        const getProductVariantDetails = async () => {
            let productDetails = await Products.findOne({ _id: order.orderItem.product._id }).select('variant');

            let variant = productDetails.variant.filter(eachVariant => (eachVariant._id).toString() === (order.orderItem.variantId).toString())[0];

            return {
                variant,
                inStock: variant.stock >= order.orderItem.qty ? true : false
            }
        }

        let { variant, inStock } = await getProductVariantDetails();

        if (order && inStock) {

            // update product stock and inStock status
            if (parseInt(variant.stock) - parseInt(order.orderItem.qty) <= 0) {
                await Products.updateOne(
                    { 'variant._id': order.orderItem.variantId },
                    {
                        $set: {
                            'variant.$.stock': (parseInt(variant.stock) - parseInt(order.orderItem.qty)),
                            'variant.$.inStock': false,
                            'variant.$.sales': parseInt(variant.sales) + parseInt(order.orderItem.qty)
                        }
                    })
            } else {
                await Products.updateOne(
                    { 'variant._id': order.orderItem.variantId },
                    {
                        $set: {
                            'variant.$.stock': parseInt(parseInt(variant.stock) - parseInt(order.orderItem.qty)),
                            'variant.$.inStock': false
                        }
                    })
            }

            let emailData = {
                name: req.user.name,
                email: req.user.email,
                type: 'Order Invoice',
                user: req.user,
                order
            }

            process.env.NODE_ENV !== 'production' ? emailSender(emailData) : null

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
                order.paymentResult.id = uuidV4();
                order.paymentResult.status = 'Due'
                order.paidAt = '';
                order.isPaid = false;
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

        }
        else if (order && !inStock) {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `The product ${orderId} you choose is out of stock !`
            });
        }
        else {
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