const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
  updatePassword,
  requestAdmin,
  getUserFavorites,
  toggleFavorite
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);
router.post('/request-admin', protect, requestAdmin);
router.get('/favorites', protect, getUserFavorites);
router.post('/favorites/:id', protect, toggleFavorite);

module.exports = router;
