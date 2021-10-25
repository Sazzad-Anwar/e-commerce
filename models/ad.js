const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: { type: Boolean, required: true }
}, {
    timestamps: true
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;