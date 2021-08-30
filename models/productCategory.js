const mongoose = require('mongoose');

// Trees using Ancestors Array
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
    subCategory: {
        type: String,
        unique: true,
    },
    tree: [{
        type: String,
        unique: true
    }],
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;