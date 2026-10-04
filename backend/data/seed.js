require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Place = require('../models/Place');
const User = require('../models/User');
const Review = require('../models/Review');
const AdminRequest = require('../models/AdminRequest');
const initialPlaces = require('./seedData');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/citybuddy');
    console.log('Connected to MongoDB for seeding...');

    await Place.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    await AdminRequest.deleteMany({});

    console.log('Cleared existing data.');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const createdUsers = await User.create([
      {
        username: 'admin',
        email: 'admin@citybuddy.com',
        password: adminPassword,
        role: 'admin',
        points: 500,
        badges: ['Super Admin', 'Trailblazer', 'Top Contributor'],
        adminRequestStatus: 'approved'
      },
      {
        username: 'explorer',
        email: 'user@citybuddy.com',
        password: userPassword,
        role: 'user',
        points: 120,
        badges: ['City Scout', 'Coffee Lover'],
        adminRequestStatus: 'none'
      }
    ]);

    const createdPlaces = await Place.insertMany(initialPlaces);
    console.log(`Seeded ${createdPlaces.length} places.`);

    // Add initial reviews
    await Review.create([
      {
        item: createdPlaces[0]._id,
        user: {
          _id: createdUsers[1]._id,
          username: createdUsers[1].username,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${createdUsers[1].username}`
        },
        rating: 5,
        comment: 'Authentic royal Mughlai cuisine at its finest! The kebabs melted in my mouth.',
        votes: 12
      }
    ]);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
