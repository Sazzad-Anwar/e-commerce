const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Products"
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    photo: [
        {
            src: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
});

const Reviews = mongoose.model('Reviews', reviewSchema);
module.exports = Reviews;