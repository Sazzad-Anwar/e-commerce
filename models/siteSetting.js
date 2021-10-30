const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true,
    },
    siteDescription: {
        type: String,
    },
    seo: {
        title: { type: String },
        description: { type: String }
    },
    email: {
        type: String,
        required: true,
        default: 'info@test.com'
    },
    paymentMethod: {
        cod: { type: Boolean, default: true },
        online: { type: Boolean, default: true },
    },
    playStoreURL: {
        type: String,
    },
    appStoreURL: {
        type: String,
    },
    brandLogo: {
        type: String,
        required: true,
    },
    termsCondition: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    privacyPolicy: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    brandColor: {
        color: {
            type: String
        },
        gradientColor: [{
            type: String
        }]
    }
}, {
    timestamps: true
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingSchema);
module.exports = SiteSettings;