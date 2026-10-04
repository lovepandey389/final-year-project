const express = require('express');
const router = express.Router();
const { getHomeData, searchPlaces, claimPlace } = require('../controllers/placeController');
const { protect } = require('../middleware/auth');

router.get('/home', getHomeData);
router.get('/search', searchPlaces);
router.post('/claims', claimPlace);

module.exports = router;
