const mongoose = require('mongoose');

// Trees using Ancestors Array
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        tags: { type: [String], index: true }
    },
    subCategory: {
        type: String,
        tags: { type: [String], index: true }
    },
    item: {
        type: String,
        tags: { type: [String], index: true }
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;