const store = require('../config/store');
const { getIsConnected } = require('../config/db');
const Place = require('../models/Place');

// Helper to normalize category name matching (e.g. 'restaurants' -> 'Restaurant', 'hotels' -> 'Hotel')
const normalizeCategory = (cat) => {
  if (!cat) return null;
  const lower = cat.toLowerCase();
  if (lower.startsWith('restaurant')) return 'Restaurant';
  if (lower.startsWith('cafe')) return 'Cafe';
  if (lower.startsWith('attraction')) return 'Attraction';
  if (lower.startsWith('hotel')) return 'Hotel';
  if (lower.startsWith('guesthouse')) return 'Guesthouse';
  return cat;
};

// @desc    Get all places with filtering, sorting, and pagination
// @route   GET /places
exports.getPlaces = async (req, res) => {
  try {
    const { category, city, sort, page = 1, limit = 12, search } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;

    if (getIsConnected()) {
      const query = {};
      if (category) {
        query.category = normalizeCategory(category);
      }
      if (city) {
        query.city = new RegExp(city, 'i');
      }
      if (search) {
        query.$or = [
          { name: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { city: new RegExp(search, 'i') }
        ];
      }

      let sortOption = { rating: -1 };
      if (sort === '-rating') sortOption = { rating: -1 };
      else if (sort === 'rating') sortOption = { rating: 1 };
      else if (sort === 'price') sortOption = { price: 1 };
      else if (sort === '-price') sortOption = { price: -1 };

      const total = await Place.countDocuments(query);
      const places = await Place.find(query)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.status(200).json({
        places,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1
      });
    } else {
      // In-Memory store filtering
      let result = [...store.getPlaces()];

      if (category) {
        const normCat = normalizeCategory(category);
        result = result.filter(p => p.category.toLowerCase() === normCat.toLowerCase());
      }
      if (city) {
        result = result.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
      }
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
        );
      }

      // Sort
      if (sort === '-rating' || !sort) {
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sort === 'rating') {
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      } else if (sort === 'price') {
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sort === '-price') {
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
      }

      const total = result.length;
      const startIndex = (pageNum - 1) * limitNum;
      const paginated = result.slice(startIndex, startIndex + limitNum);

      return res.status(200).json({
        places: paginated,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1
      });
    }
  } catch (error) {
    console.error('getPlaces error:', error);
    return res.status(500).json({ message: 'Error retrieving places' });
  }
};

// @desc    Get place by ID
// @route   GET /places/:id
exports.getPlaceById = async (req, res) => {
  try {
    let place;
    if (getIsConnected()) {
      place = await Place.findById(req.params.id);
    } else {
      place = store.findPlaceById(req.params.id);
    }

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving place' });
  }
};

// @desc    Get home data (top rated + newly added places)
// @route   GET /home
exports.getHomeData = async (req, res) => {
  try {
    let places;
    if (getIsConnected()) {
      places = await Place.find().lean();
    } else {
      places = store.getPlaces();
    }

    const topRatedPlaces = [...places]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);

    const newlyAddedPlaces = [...places]
      .reverse()
      .slice(0, 4);

    return res.status(200).json({
      topRatedPlaces,
      newlyAddedPlaces
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching home data' });
  }
};

// @desc    Search places across all categories
// @route   GET /search
exports.searchPlaces = async (req, res) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    if (!q) {
      return res.status(200).json([]);
    }

    let places;
    if (getIsConnected()) {
      places = await Place.find({
        $or: [
          { name: new RegExp(q, 'i') },
          { description: new RegExp(q, 'i') },
          { city: new RegExp(q, 'i') },
          { category: new RegExp(q, 'i') }
        ]
      }).lean();
    } else {
      const all = store.getPlaces();
      places = all.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    return res.status(200).json(places);
  } catch (error) {
    return res.status(500).json({ message: 'Error searching places' });
  }
};

// @desc    Create new place (Admin)
// @route   POST /places
exports.createPlace = async (req, res) => {
  try {
    const placeData = req.body;
    let newPlace;

    if (getIsConnected()) {
      newPlace = await Place.create(placeData);
    } else {
      newPlace = store.addPlace(placeData);
    }

    return res.status(201).json({
      message: 'Place created successfully',
      place: newPlace
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create place', error: error.message });
  }
};

// @desc    Update place (Admin)
// @route   PUT /places/:id
exports.updatePlace = async (req, res) => {
  try {
    let updated;
    if (getIsConnected()) {
      updated = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      updated = store.updatePlace(req.params.id, req.body);
    }

    if (!updated) {
      return res.status(404).json({ message: 'Place not found' });
    }

    return res.status(200).json({
      message: 'Place updated successfully',
      place: updated
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update place' });
  }
};

// @desc    Delete place (Admin)
// @route   DELETE /places/:id
exports.deletePlace = async (req, res) => {
  try {
    let deleted;
    if (getIsConnected()) {
      deleted = await Place.findByIdAndDelete(req.params.id);
    } else {
      deleted = store.deletePlace(req.params.id);
    }

    if (!deleted) {
      return res.status(404).json({ message: 'Place not found' });
    }

    return res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete place' });
  }
};

// @desc    Suggest edit for a place
// @route   POST /places/:id/suggest-edit
exports.suggestEdit = async (req, res) => {
  try {
    const { suggestion } = req.body;
    store.addAdminRequest({
      placeId: req.params.id,
      user: req.user ? { _id: req.user._id, username: req.user.username } : { username: 'Anonymous' },
      type: 'suggest_edit',
      suggestion,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({ message: 'Thank you! Your edit suggestion has been submitted for review.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit suggestion' });
  }
};

// @desc    Claim a place
// @route   POST /claims
exports.claimPlace = async (req, res) => {
  try {
    const { placeId, message } = req.body;
    store.addAdminRequest({
      placeId,
      user: req.user ? { _id: req.user._id, username: req.user.username } : { username: 'Business Owner' },
      type: 'claim',
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({ message: 'Claim request submitted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit claim request' });
  }
};
