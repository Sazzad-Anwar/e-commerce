const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    vendor: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Vendor'
    },
    name: {
        type: String,
        required: true
    },
    hotSell: {
        status: { type: Boolean, default: false },
        discount: { type: Number, default: 0.00 },
        banners: [
            { src: { type: String } }
        ]
    },
    campaign: {
        status: { type: Boolean, default: false },
        campaignName: { type: String },
        discount: { type: Number, default: 0.00 },
        banners: [
            { src: { type: String } }
        ]
    },
    variant: [{ type: mongoose.SchemaTypes.ObjectId, required: true }],
    sku: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    specification: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reviews'
    }]
}, {
    timestamps: true
})

const Products = mongoose.model('Products', productSchema);

module.exports = Products;