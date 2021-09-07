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
        image: { type: String, required: true },
        sku: {
            type: String,
            required: true,
        },
        inStock: { type: Boolean, required: true, default: this.stock > 0 ? true : false }
    }],
    brand: {
        type: String,
        required: true
    },
    shippingCharge: {
        type: Number,
        default: 0.00
    },
    serviceCharge: {
        type: Number,
        default: 0.00
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