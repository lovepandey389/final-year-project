const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  points: { type: Number, default: 0 },
  badges: [{ type: String }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  adminRequestStatus: { type: String, enum: ['none', 'pending', 'approved', 'denied'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
