const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        index: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email is taken'],
        index: true
    },
    phone: {
        type: String,
        match: /^(?:8801)\d{9}$/,
        required: [true, 'Phone number is required'],
        unique: [true, 'This phone number is taken'],
        index: true
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        maxlength: 1024,
        trim: true
    },
    photo: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
        index: true
    },
    activationId: {
        type: String
    },
    passwordResetId: {
        type: String
    },
    registeredFrom: {
        type: String,
        enum: ['android', 'ios', 'web', 'facebook', 'instagram'],
        required: true,
        index: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;