require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database (or activate robust in-memory fallback)
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/user', userRoutes);
app.use('/places', placeRoutes);
app.use('/reviews', reviewRoutes);
app.use('/admin', adminRoutes);
app.use('/', homeRoutes);

// Root and Health Check
app.get('/', (req, res) => {
  res.json({
    project: 'CityBuddy API - Smart Travel & Local Discovery Platform',
    status: 'online',
    version: '1.0.0',
    liveApp: 'https://city-buddy.vercel.app/',
    endpoints: {
      auth: ['POST /user/signup', 'POST /user/login', 'GET /user/me', 'GET /user/favorites', 'POST /user/favorites/:id'],
      places: ['GET /places', 'GET /places/:id', 'POST /places (admin)', 'PUT /places/:id (admin)', 'DELETE /places/:id (admin)'],
      reviews: ['GET /reviews/:placeId', 'POST /reviews', 'POST /reviews/:id/vote', 'POST /reviews/:id/reply'],
      admin: ['GET /admin/requests', 'PUT /admin/requests/:id'],
      discovery: ['GET /home', 'GET /search?q=...']
    },
    demoCredentials: {
      admin: { email: 'admin@citybuddy.com', password: 'admin123' },
      user: { email: 'user@citybuddy.com', password: 'user123' }
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 CityBuddy Backend Server is running on port ${PORT}`);
  console.log(`🌍 Live Web App: https://city-buddy.vercel.app/`);
  console.log(`📡 Local API:    http://localhost:${PORT}`);
  console.log(`👤 Demo Admin:  admin@citybuddy.com / admin123`);
  console.log(`👤 Demo User:   user@citybuddy.com / user123`);
  console.log(`====================================================`);
});
