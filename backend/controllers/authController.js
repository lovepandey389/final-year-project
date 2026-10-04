const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../config/store');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');
const Place = require('../models/Place');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'citybuddy_super_secret_jwt_key_2026_dev', {
    expiresIn: '30d'
  });
};

// @desc    Register user
// @route   POST /user/signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role, adminCode } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    let existingUser;
    if (getIsConnected()) {
      existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    } else {
      existingUser = store.findUserByEmail(email) || store.findUserByUsername(username);
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    let assignedRole = 'user';
    if (role === 'admin' && adminCode) {
      if (adminCode === (process.env.ADMIN_CODE || 'CITYBUDDY_ADMIN_2026')) {
        assignedRole = 'admin';
      } else {
        return res.status(400).json({ message: 'Invalid admin registration secret code' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (getIsConnected()) {
      newUser = await User.create({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: assignedRole,
        points: 50,
        badges: ['New Explorer'],
        favorites: [],
        adminRequestStatus: assignedRole === 'admin' ? 'approved' : 'none'
      });
    } else {
      newUser = store.addUser({
        _id: 'user_' + Date.now(),
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: assignedRole,
        points: 50,
        badges: ['New Explorer'],
        favorites: [],
        adminRequestStatus: assignedRole === 'admin' ? 'approved' : 'none',
        createdAt: new Date().toISOString()
      });
    }

    const token = generateToken(newUser._id);
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      points: newUser.points,
      badges: newUser.badges,
      favorites: newUser.favorites,
      adminRequestStatus: newUser.adminRequestStatus
    };

    return res.status(201).json({
      message: 'Account created successfully! Welcome to CityBuddy.',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /user/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    let user;
    if (getIsConnected()) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = store.findUserByEmail(email);
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    const token = generateToken(user._id);
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      points: user.points,
      badges: user.badges,
      favorites: user.favorites,
      adminRequestStatus: user.adminRequestStatus
    };

    return res.status(200).json({
      message: 'Logged in successfully',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /user/me
exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      points: user.points || 0,
      badges: user.badges || [],
      favorites: user.favorites || [],
      adminRequestStatus: user.adminRequestStatus || 'none'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving profile' });
  }
};

// @desc    Update password
// @route   PUT /user/update-password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if (getIsConnected()) {
      user.password = hashedPassword;
      await user.save();
    } else {
      user.password = hashedPassword;
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update password' });
  }
};

// @desc    Request admin access
// @route   POST /user/request-admin
exports.requestAdmin = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'You are already an administrator' });
    }

    user.adminRequestStatus = 'pending';
    if (getIsConnected()) {
      await user.save();
    }

    store.addAdminRequest({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      type: 'admin_access',
      reason: req.body.reason || 'User requested admin privileges to contribute places.',
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({ message: 'Admin request submitted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit admin request' });
  }
};

// @desc    Get user's favorites
// @route   GET /user/favorites
exports.getUserFavorites = async (req, res) => {
  try {
    const user = req.user;
    const favIds = (user.favorites || []).map(f => (typeof f === 'object' && f._id ? f._id.toString() : f.toString()));

    let favoritePlaces = [];
    if (getIsConnected()) {
      favoritePlaces = await Place.find({ _id: { $in: favIds } });
    } else {
      const allPlaces = store.getPlaces();
      favoritePlaces = allPlaces.filter(p => favIds.includes(p._id.toString()));
    }

    return res.status(200).json(favoritePlaces);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};

// @desc    Toggle favorite status of a place
// @route   POST /user/favorites/:id
exports.toggleFavorite = async (req, res) => {
  try {
    const placeId = req.params.id;
    const user = req.user;

    const favIndex = (user.favorites || []).findIndex(
      f => (typeof f === 'object' && f.item ? f.item.toString() === placeId : f.toString() === placeId)
    );

    if (favIndex > -1) {
      user.favorites.splice(favIndex, 1);
    } else {
      // Frontend checks z => z.item.toString() === x or string ID
      user.favorites.push({ item: placeId });
    }

    if (getIsConnected()) {
      await user.save();
    }

    return res.status(200).json({
      message: 'Favorites updated',
      favorites: user.favorites
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update favorites' });
  }
};
