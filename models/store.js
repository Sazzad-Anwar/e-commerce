const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    storeName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        match: /^(?:8801)\d{9}$/,
        trim: true,
        unique: [true, 'This phone number is already exists'],
    },
    logo: {
        type: String
    },
    address: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    seo: {
        title: { type: String },
        description: { type: String }
    },
    webSite: {
        type: String
    },
    mapEmbedCode: {
        type: String
    },
    image: [
        { type: String }
    ],
    disabled: {
        type: Boolean,
        default: false
    }
}, {
    timeStamps: true
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;