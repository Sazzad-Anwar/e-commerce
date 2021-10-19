const mongoose = require('mongoose');

// Trees using Ancestors Array
const categorySchema = new mongoose.Schema({
    category: {
        type: String, required: true, tags: { type: [String], index: true }
    },
    subCategory: [
        { type: String }
    ],
    item: [
        { type: String }
    ]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;