const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { type: String, index: true, required: true },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
})


const Category = mongoose.model('Category', categorySchema);
module.exports = Category