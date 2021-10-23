const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        index: true,
    },
    subCategory: {
        type: String,
        index: true,
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category