const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    vendor: {
        type: mongoose.SchemaTypes.ObjectId,
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