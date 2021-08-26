const mongoose = require('mongoose');

const errorSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    IP: {
        type: String,
        required: true,
    },
    stack: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Errors = mongoose.model('Errors', errorSchema);

module.exports = Errors;