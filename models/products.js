const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    },
    name: {
        type: String,
        required: true,
        tags: { type: [String], index: true }
    },
    campaign: {
        status: { type: Boolean, default: false },
        campaignName: { type: String },
        discount: { type: Number, default: 0.00 },
        banners: [
            { src: { type: String } }
        ]
    },
    category: { type: String, required: true },
    subCategory: { type: String },
    item: { type: String, required: true },
    location: {
        type: String,
        required: true,
        unique: true,
        tags: { type: [String], index: true }
    },
    seo: {
        metaTag: { type: String },
        description: { type: String },
    },
    variant: [{
        color: { type: String, required: true },
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0.00 },
        image: { type: String, required: true },
        sales: { type: Number, default: 0 },
        sku: {
            type: String,
            required: true,
        },
        inStock: { type: Boolean, required: true, default: true },
        purchasePrice: { type: Number, required: true, default: 0.00 }
    }],
    brand: {
        type: String,
        required: true,
        tags: { type: [String], index: true }
    },
    shippingCharge: {
        type: Number,
        default: 0.00
    },
    serviceCharge: {
        type: Number,
        default: 0.00
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
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Products = mongoose.model('Products', productSchema);

module.exports = Products;