const mongoose = require('mongoose');

const AdminRequestSchema = new mongoose.Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    email: { type: String }
  },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  type: {
    type: String,
    enum: ['admin_access', 'claim', 'suggest_edit'],
    default: 'admin_access'
  },
  reason: { type: String },
  message: { type: String },
  suggestion: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminRequest', AdminRequestSchema);
