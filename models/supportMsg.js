const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    },
    messages: [
        {
            from: {
                type: String,
                required: true,
            },
            to: {
                type: String,
                required: true,
            },
            file: {
                type: String,
            },
            message: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true });

const Message = mongoose.model('Message', msgSchema);

module.exports = Message;