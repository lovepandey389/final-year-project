const express = require('express');
const router = express.Router();
const {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  suggestEdit
} = require('../controllers/placeController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getPlaces);
router.get('/:id', getPlaceById);
router.post('/', protect, adminOnly, createPlace);
router.put('/:id', protect, adminOnly, updatePlace);
router.delete('/:id', protect, adminOnly, deletePlace);
router.post('/:id/suggest-edit', suggestEdit);

module.exports = router;
