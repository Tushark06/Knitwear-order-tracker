const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    poNumber: {
        type: String,
        required: true,
        unique: true
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },

    styleName: {
        type: String,
        required: true
    },

    colour: {
        type: String,
        required: true
    },

    totalQuantity: {
        type: Number,
        required: true,
        min: 0,
    },

    sizeQuantities: {
        type: Map,
        of: Number,
        default: {}
    },

    exFactoryDate: {
        type: Date,
        required: true
    },

    unit: {
        type: String,
        enum: ['Unit 1', 'Unit 2', 'Unit 3'],
        required: true
    },

    currentStage: {
        type: String,
        enum: ['Knitting', 'Dyeing', 'Cutting', 'Printing', 'Stitching', 'Washing', 'Finishing', 'Packing'],
        default: 'Knitting'
    },

    milestones: [{name: {type: String, required: true}, plannedDate: {type: Date, required: true}, actualDate: {type: Date}, completed: {type: Boolean, default: false}}],

}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
    
