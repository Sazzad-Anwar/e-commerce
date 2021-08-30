const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    },
    name: {
        type: String,
        required: true
    },
    image: [
        { src: { type: String, required: true } }
    ],
    campaign: {
        status: { type: Boolean, default: false },
        campaignName: { type: String },
        discount: { type: Number, default: 0.00 },
        banners: [
            { src: { type: String } }
        ]
    },
    variant: [{
        color: { type: String, required: true },
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        sku: {
            type: String,
            required: true,
        },
    }],
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }]
}, {
    timestamps: true
})

const Products = mongoose.model('Products', productSchema);

module.exports = Products;