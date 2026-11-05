const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

    stage: {
        type: String,
        enum: ['Knitting', 'Dyeing', 'Cutting', 'Printing', 'Stitching', 'Washing', 'Finishing', 'Packing'],
        required: true
    },

    level: {
        type: String,
        enum: ['Amber', 'Red'],
        required: true
    },

    requiredPerDay: {
        type: Number,
        required: true,
        min: 0
    },

    actualPerDay: {
        type: Number,
        required: true,
        min: 0
    },

    remainingQuantity: {
        type: Number,
        required: true,
        min: 0
    },


    daysLeft: {
        type: Number,
        required: true,
        min: 0
    },

    message: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ['Open', 'Confirmed', 'Sent to buyer', 'Resolved'],
        default: 'Open'
    },
    
  },  {timestamps: true});

module.exports = mongoose.model('Alert', alertSchema);

