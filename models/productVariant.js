const mongoose = require('mongoose');

const productVariantSchema = mongoose.Schema({
    color: { type: String, required: true },
    src: { type: String, required: true, unique: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

const productVariant = productVariantSchema.model('Variant', productVariantSchema);

module.exports = productVariant;