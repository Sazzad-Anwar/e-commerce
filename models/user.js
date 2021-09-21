const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        tags: {
            type: [String],
            index: true
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email is taken'],
        tags: {
            type: [String],
            index: true
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: [true, 'This phone number is taken'],
        tags: {
            type: [String],
            index: true
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    photo: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    activationId: {
        type: String
    },
    passwordResetId: {
        type: String
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