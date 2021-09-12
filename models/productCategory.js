const mongoose = require('mongoose');

// Trees using Ancestors Array
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
    },
    item: {
        type: String,
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;