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
        index: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    seo: {
        title: { type: String },
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
    thumbImage: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
        index: true,
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