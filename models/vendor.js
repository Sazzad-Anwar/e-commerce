const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        tags: {
            type: [String],
            index: true
        }
    },
    shopName: {
        type: String,
        required: [true, 'Shop Name is required'],
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
    shopAddress: {
        type: String,
        required: [true, 'Address is required'],
    },
    division: {
        type: String,
        required: [true, 'division is required'],
    },

    district: {
        type: String,
        required: [true, 'District is required']
    },

    upaZila: {
        type: String,
        required: [true, 'Upazila is required']
    },

    ward: {
        type: String,
        required: [true, 'Ward is required']
    },
    NID: {
        type: String,
        required: [true, 'NId is required'],
        tags: {
            type: [String],
            index: true
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
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

vendorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

vendorSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;