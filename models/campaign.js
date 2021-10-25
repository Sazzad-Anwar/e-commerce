const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        index: true,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    originalPrice: {
        type: Number, required: true
    },
    discountPrice: {
        type: Number, required: true
    },
    includingTax: {
        status: { type: Boolean },
        taxInPercent: { type: Number }
    },
    shipping: {
        type: { type: String, enum: ['free', 'paid'], default: 'free' },
        amount: { type: Number, default: 0 }
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    deliveryWithin: {
        type: String
    },
    seo: {
        title: { type: String },
        description: { type: String }
    },
    userLimit: {
        type: Number,
        required: true
    },
    applyCancellationPolicy: {
        type: Boolean,
        required: true
    },
    applyReturnPolicy: {
        type: Boolean,
        required: true
    },
    applyReplacementPolicy: {
        type: Boolean,
        required: true
    },
    banners: [
        { type: String, required: true }
    ],
    sales: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;