const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Restaurant', 'Cafe', 'Attraction', 'Hotel', 'Guesthouse'] 
  },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  phone: { type: String },
  website: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  amenities: [{ type: String }]
}, { timestamps: true });

PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ name: 'text', description: 'text', city: 'text' });

module.exports = mongoose.model('Place', PlaceSchema);
