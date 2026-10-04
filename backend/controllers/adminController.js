const store = require('../config/store');
const { getIsConnected } = require('../config/db');
const AdminRequest = require('../models/AdminRequest');
const User = require('../models/User');

// @desc    Get all pending admin requests
// @route   GET /admin/requests
exports.getAdminRequests = async (req, res) => {
  try {
    if (getIsConnected()) {
      const requests = await AdminRequest.find().sort({ createdAt: -1 });
      return res.status(200).json(requests);
    } else {
      const requests = store.getAdminRequests();
      return res.status(200).json(requests);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving admin requests' });
  }
};

// @desc    Resolve an admin request
// @route   PUT /admin/requests/:id
exports.resolveAdminRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approve' or 'deny'

    if (!['approve', 'deny'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action. Must be approve or deny.' });
    }

    if (getIsConnected()) {
      const request = await AdminRequest.findById(id);
      if (!request) return res.status(404).json({ message: 'Request not found' });

      request.status = action === 'approve' ? 'approved' : 'denied';
      await request.save();

      // If it's an admin access request and approved, upgrade user role
      if (request.type === 'admin_access' && action === 'approve' && request.user?._id) {
        await User.findByIdAndUpdate(request.user._id, {
          role: 'admin',
          adminRequestStatus: 'approved'
        });
      }

      return res.status(200).json({ message: `Request has been ${action}d.` });
    } else {
      const request = store.resolveAdminRequest(id, action);
      if (!request) return res.status(404).json({ message: 'Request not found' });

      if (request.type === 'admin_access' && action === 'approve' && request.user?._id) {
        const u = store.findUserById(request.user._id);
        if (u) {
          u.role = 'admin';
          u.adminRequestStatus = 'approved';
        }
      }

      return res.status(200).json({ message: `Request has been ${action}d.` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error resolving admin request' });
  }
};
