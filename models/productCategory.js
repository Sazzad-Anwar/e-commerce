const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    name: {
        type: String,
    },
    children: [categorySchema]
});

const Category = categorySchema.model('Category', categorySchema);

module.exports = Category;