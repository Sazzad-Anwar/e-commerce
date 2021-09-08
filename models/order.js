const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItem: {
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Products'
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Vendor'
        },
        variant_id: { type: mongoose.Schema.Types.ObjectId, },
        color: { type: String },
        size: { type: String },
        image: { type: String }
    },
    discount: {
        type: Number,
        default: 0.00
    },
    discountPrice: {
        type: Number
    },
    shippingAddress: {
        address: { type: String },
        city: { type: String },
        district: { type: String },
        division: { type: String },
    },
    paymentMethod: {
        type: String,
        enum: ['Cash-On-Delivery', 'Bkash', 'Nagad', 'Visa-Card', 'Master-Card']
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        email: { type: String }
    },
    serviceCharge: {
        type: Number,
        default: 0.0
    },
    shippingCharge: {
        type: Number,
        default: 0.0
    },
    shippingStatus: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED'],
        default: 'PENDING'
    },
    totalPrice: {
        type: Number,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    addedToCart: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;