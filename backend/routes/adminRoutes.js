const express = require('express');
const router = express.Router();
const { getAdminRequests, resolveAdminRequest } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/requests', protect, adminOnly, getAdminRequests);
router.put('/requests/:id', protect, adminOnly, resolveAdminRequest);

module.exports = router;
