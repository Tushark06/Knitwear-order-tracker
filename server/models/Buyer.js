const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    country: {
        type: String,
        required: true,
    },

    contactName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Buyer', buyerSchema);