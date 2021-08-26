const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Reviews = mongoose.model('Reviews', reviewSchema);
module.exports = Reviews;