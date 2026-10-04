const express = require('express');
const router = express.Router();
const {
  getReviewsByPlace,
  addReview,
  voteReview,
  replyReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/:placeId', getReviewsByPlace);
router.post('/', protect, addReview);
router.post('/:id/vote', voteReview);
router.post('/:id/reply', protect, replyReview);

module.exports = router;
