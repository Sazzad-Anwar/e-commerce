const mongoose = require('mongoose');

const posSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        index: true
    },
    phoneNumber: {
        type: String,
        match: /^(?:8801)\d{9}$/,
        required: [true, 'Phone number is required'],
        unique: [true, 'This phone number is taken'],
        index: true
    },
    orderItems: [{
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
        variantId: { type: mongoose.Schema.Types.ObjectId, },
        color: { type: String },
        size: { type: String },
        image: { type: String },
        discountAmount: { type: Number, default: 0 }
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    discountAmount: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentResult: {
        status: { type: String },
        updateTime: { type: Date },
        transactionId: { type: String },
        paymentMethod: {
            type: String,
        },
    },
    membershipType: {
        type: String,
        enum: ['silver', 'gold', 'diamond', 'platinum']
    }
}, {
    timestamps: true
});

const POS = mongoose.model('POS', posSchema);

module.exports = POS;