const Order = require('../../models/order');
const asyncHandler = require('express-async-handler');
const Products = require('../../models/products');

/*
##### @Description: Add a product to cart
##### Route: /api/v1/order/cart
##### Method: POST
##### Access: User
*/
const addToCart = asyncHandler(async (req, res) => {

    const { product, user } = req.body;

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

    let totalPrice = (orderItem.qty * orderItem.price) + cartProduct?.serviceCharge + cartProduct?.shippingCharge;

    let newCart = new Order({
        user,
        orderItem,
        totalPrice,
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
    })
});


module.exports = {
    addToCart
}