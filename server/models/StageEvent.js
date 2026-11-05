const mongoose = require('mongoose');

const stageEventSchema = new mongoose.Schema({
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

  date: {
    type: Date,
    default: Date.now
  },

  quantityDone: {
    type: Number,
    required: true,
    min: 0
  },

  photoUrl: {
    type: String,
    default: ''
  },

  issueNote: {
    type: String,
    default: ''
  },

  reasonCategory: {
    type: String,
    enum: ['No issue', 'Machine breakdown', 'Power cut', 'Material delay', 'Labour shortage', 'Quality issue', 'Other'],
    default: 'No issue'
  },

  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

}, {timestamps: true});

module.exports = mongoose.model('StageEvent', stageEventSchema);