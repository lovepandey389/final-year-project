const store = require('../config/store');
const { getIsConnected } = require('../config/db');
const Review = require('../models/Review');
const Place = require('../models/Place');
const User = require('../models/User');

// @desc    Get reviews for a place
// @route   GET /reviews/:placeId
exports.getReviewsByPlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    const { sort } = req.query;

    if (getIsConnected()) {
      let sortOption = { createdAt: -1 };
      if (sort === 'rating') sortOption = { rating: -1 };
      if (sort === 'votes') sortOption = { votes: -1 };

      const reviews = await Review.find({ item: placeId }).sort(sortOption);
      return res.status(200).json(reviews);
    } else {
      let placeReviews = store.getReviewsByPlace(placeId);
      if (sort === 'rating') {
        placeReviews = [...placeReviews].sort((a, b) => b.rating - a.rating);
      } else if (sort === 'votes') {
        placeReviews = [...placeReviews].sort((a, b) => b.votes - a.votes);
      } else {
        placeReviews = [...placeReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      return res.status(200).json(placeReviews);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// @desc    Add review
// @route   POST /reviews
exports.addReview = async (req, res) => {
  try {
    const { item, rating, comment } = req.body;
    const user = req.user;

    if (!item || !rating || !comment) {
      return res.status(400).json({ message: 'Place, rating, and comment are required' });
    }

    let createdReview;
    if (getIsConnected()) {
      createdReview = await Review.create({
        item,
        user: {
          _id: user._id,
          username: user.username,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
        },
        rating: Number(rating),
        comment,
        votes: 0,
        replies: []
      });

      // Update Place rating and count
      const allRevs = await Review.find({ item });
      const avg = allRevs.reduce((acc, r) => acc + r.rating, 0) / allRevs.length;
      await Place.findByIdAndUpdate(item, {
        rating: Math.round(avg * 10) / 10,
        reviewsCount: allRevs.length
      });

      // Award points to user (+25 points)
      user.points = (user.points || 0) + 25;
      if (user.points >= 100 && !user.badges.includes('Elite Reviewer')) {
        user.badges.push('Elite Reviewer');
      }
      await user.save();
    } else {
      createdReview = store.addReview({
        _id: 'rev_' + Date.now(),
        item,
        user: {
          _id: user._id,
          username: user.username,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
        },
        rating: Number(rating),
        comment,
        votes: 0,
        voters: [],
        replies: [],
        createdAt: new Date().toISOString()
      });

      // Update in-memory place
      const place = store.findPlaceById(item);
      if (place) {
        const placeRevs = store.getReviewsByPlace(item);
        const avg = placeRevs.reduce((acc, r) => acc + r.rating, 0) / placeRevs.length;
        place.rating = Math.round(avg * 10) / 10;
        place.reviewsCount = placeRevs.length;
      }

      // Award points
      user.points = (user.points || 0) + 25;
      if (!user.badges) user.badges = [];
      if (user.points >= 100 && !user.badges.includes('Elite Reviewer')) {
        user.badges.push('Elite Reviewer');
      }
    }

    return res.status(201).json({
      message: 'Review posted! You earned 25 points.',
      review: createdReview
    });
  } catch (error) {
    console.error('addReview error:', error);
    return res.status(500).json({ message: 'Failed to post review' });
  }
};

// @desc    Vote on a review (helpful)
// @route   POST /reviews/:id/vote
exports.voteReview = async (req, res) => {
  try {
    const { id } = req.params;
    let review;

    if (getIsConnected()) {
      review = await Review.findById(id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      review.votes = (review.votes || 0) + 1;
      await review.save();
    } else {
      review = store.findReviewById(id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      review.votes = (review.votes || 0) + 1;
    }

    return res.status(200).json({ message: 'Vote recorded', votes: review.votes });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to vote' });
  }
};

// @desc    Reply to a review
// @route   POST /reviews/:id/reply
exports.replyReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const user = req.user;

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required for reply' });
    }

    let review;
    if (getIsConnected()) {
      review = await Review.findById(id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      review.replies.push({
        comment,
        user: { username: user ? user.username : 'Community Member' },
        createdAt: new Date()
      });
      await review.save();
    } else {
      review = store.findReviewById(id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      if (!review.replies) review.replies = [];
      review.replies.push({
        _id: 'rep_' + Date.now(),
        comment,
        user: { username: user ? user.username : 'Community Member' },
        createdAt: new Date().toISOString()
      });
    }

    return res.status(200).json({ message: 'Reply added successfully', review });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to post reply' });
  }
};
