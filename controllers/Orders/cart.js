const Order = require('../../models/order');
const asyncHandler = require('express-async-handler');
const Products = require('../../models/products');

/*
##### @Description: Add, update a product to cart and get all product of that user. for pagination I have used the keyset 
##### Route: /api/v1/orders/cart
##### Method: POST, GET, PUT
##### Access: User
*/
const cart = asyncHandler(async (req, res) => {

    if (req.user.type === 'user') {

        let { limit, lastId } = req.query;

        if (req.method === 'GET') {

            let cart;

            //setting up the way of paginated data in fasted response using keyset pagination

            if (!lastId || lastId === undefined) {

                cart = await Order
                    .find({ user: req.user._id })
                    .sort({
                        _id: -1
                    })
                    .limit(limit ? parseInt(limit) : 0)
                    .populate({
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
            }


            if (limit && lastId) {

                cart = await Order
                    .find({
                        $and: [
                            { user: req.user._id },
                            { _id: { $lt: lastId } }
                        ]
                    })
                    .sort({
                        _id: -1
                    })
                    .limit(limit ? parseInt(limit) : 50)
                    .populate({
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
            }

            if (cart.length) {

                res.status(200).json({
                    code: 200,
                    isSuccess: true,
                    status: 'success',
                    data: {
                        length: cart.length,
                        lastId: cart[cart.length - 1]._id,
                        cart: cart,
                    }
                })

            } else {

                res.status(404).json({
                    code: 404,
                    isSuccess: false,
                    status: 'failed',
                    message: 'No order found'
                })
            }
        }


        if (req.method === 'POST') {

            const { product } = req.body;

            let orderItem = {};

            let cartProduct = await Products.findById(product._id);
            let variant = cartProduct?.variant?.filter(productVariant => productVariant._id.toString() === product.variantId);
            orderItem.qty = product.quantity;
            orderItem.price = variant[0].price;
            orderItem.product = product._id;
            orderItem.variant_id = variant[0]._id;
            orderItem.color = variant[0]?.color;
            orderItem.size = variant[0]?.size;
            orderItem.image = variant[0]?.image;
            orderItem.vendor = cartProduct.vendor;

            let totalPrice = ((orderItem.qty * orderItem.price) - ((orderItem.qty * orderItem.price) * cartProduct.campaign.discount)) + cartProduct?.serviceCharge + cartProduct?.shippingCharge;

            let newCart = new Order({
                user: req.user._id,
                orderItem,
                totalPrice,
                discount: cartProduct.campaign.discount,
                addedToCart: true,
                discountPrice: ((orderItem.qty * orderItem.price) - ((orderItem.qty * orderItem.price) * cartProduct.campaign.discount)),
                serviceCharge: cartProduct?.serviceCharge,
                shippingCharge: cartProduct?.shippingCharge
            });

            let cart = await newCart.save();

            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                data: {
                    cart
                }
            });
        }

        if (req.method === 'PUT') {

            let { orderId, product } = req.body;

            let order = await Order.findOne({ _id: orderId, user: req.user._id });

            let cartProduct = await Products.findById(product._id);

            if (order && cartProduct) {

                let variant = cartProduct?.variant?.filter(productVariant => productVariant._id.toString() === product.variantId);
                order.orderItem.qty = product.quantity;
                order.orderItem.price = variant[0].price;
                order.orderItem.color = variant[0].color;
                order.orderItem.size = variant[0].size;
                order.orderItem.image = variant[0].image
                order.totalPrice = ((product.quantity * variant[0].price) - ((product.quantity * variant[0].price) * cartProduct.campaign.discount)) + cartProduct?.serviceCharge + cartProduct?.shippingCharge;
                order.shippingCharge = cartProduct.shippingCharge;
                order.serviceCharge = cartProduct.serviceCharge;
                order.discount = cartProduct.campaign.discount;
                order.discountPrice = ((product.quantity * variant[0].price) - ((product.quantity * variant[0].price) * cartProduct.campaign.discount))

                let updatedOrder = await order.save();

                res.json({
                    code: 200,
                    isSuccess: true,
                    status: 'success',
                    data: {
                        order: updatedOrder
                    }
                })
            } else {
                res.status(404).json({
                    code: 404,
                    isSuccess: false,
                    status: 'failed',
                    message: 'Order is not found'
                })
            }
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
##### @Description: Delete a product from the cart
##### Route: /api/v1/orders/cart/:id
##### Method: Delete
##### Access: User
*/
const deleteCart = asyncHandler(async (req, res) => {

    if (req.user.type === 'user') {

        let deleteCart = await Order.findOneAndDelete({ user: req.user._id, _id: req.params.id });

        if (deleteCart) {
            res.json({
                code: 200,
                isSuccess: true,
                status: 'success',
                message: `Order ${req.params.id} is deleted`
            })
        } else {
            res.status(404).json({
                code: 404,
                isSuccess: false,
                status: 'failed',
                message: `Order ${req.params.id} is not found`
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


module.exports = {
    cart,
    deleteCart
}