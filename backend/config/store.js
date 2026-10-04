const bcrypt = require('bcryptjs');
const initialPlaces = require('../data/seedData');

// In-Memory Collections
let users = [];
let places = JSON.parse(JSON.stringify(initialPlaces));
let reviews = [
  {
    _id: "65f02b1b2222222222222201",
    item: "65f01a1a1111111111111101",
    user: {
      _id: "65f03c1c3333333333333301",
      username: "foodie_wanderer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    rating: 5,
    comment: "The mutton seekh kebabs and butter chicken are absolutely out of this world! A must-visit whenever in Old Delhi.",
    votes: 18,
    voters: [],
    replies: [
      {
        _id: "rep1",
        comment: "Totally agree! Don't miss their sheermaal either.",
        user: { username: "delhi_local" },
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: "65f02b1b2222222222222202",
    item: "65f01a1a1111111111111105",
    user: {
      _id: "65f03c1c3333333333333302",
      username: "coffee_connoisseur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    rating: 5,
    comment: "Best pour-over coffee experience in the city. The tranquil outdoor seating in Champa Gali makes it a serene oasis.",
    votes: 9,
    voters: [],
    replies: [],
    createdAt: new Date(Date.now() - 259200000).toISOString()
  }
];

let adminRequests = [
  {
    _id: "65f04d1d4444444444444401",
    user: {
      _id: "65f03c1c3333333333333303",
      username: "rahul_travels",
      email: "rahul@example.com"
    },
    type: "admin_access",
    reason: "Local city guide with 5+ years verifying tourist spots and cultural hubs in Rajasthan.",
    status: "pending",
    createdAt: new Date().toISOString()
  }
];

// Initialize default admin and user
const initDefaultUsers = async () => {
  const adminHashedPassword = await bcrypt.hash("admin123", 10);
  const userHashedPassword = await bcrypt.hash("user123", 10);

  users = [
    {
      _id: "65f03c1c3333333333333399",
      username: "admin",
      email: "admin@citybuddy.com",
      password: adminHashedPassword,
      role: "admin",
      points: 500,
      badges: ["Super Admin", "Trailblazer", "Top Contributor"],
      favorites: ["65f01a1a1111111111111101", "65f01a1a1111111111111108"],
      adminRequestStatus: "approved",
      createdAt: new Date().toISOString()
    },
    {
      _id: "65f03c1c3333333333333388",
      username: "explorer",
      email: "user@citybuddy.com",
      password: userHashedPassword,
      role: "user",
      points: 120,
      badges: ["City Scout", "Coffee Lover"],
      favorites: ["65f01a1a1111111111111105", "65f01a1a1111111111111111"],
      adminRequestStatus: "none",
      createdAt: new Date().toISOString()
    }
  ];
};

initDefaultUsers();

module.exports = {
  getUsers: () => users,
  addUser: (u) => { users.push(u); return u; },
  findUserById: (id) => users.find(u => u._id === id || u._id?.toString() === id?.toString()),
  findUserByEmail: (email) => users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  findUserByUsername: (uname) => users.find(u => u.username.toLowerCase() === uname.toLowerCase()),
  
  getPlaces: () => places,
  findPlaceById: (id) => places.find(p => p._id === id || p._id?.toString() === id?.toString()),
  addPlace: (p) => {
    if (!p._id) p._id = "place_" + Date.now();
    places.unshift(p);
    return p;
  },
  updatePlace: (id, update) => {
    const idx = places.findIndex(p => p._id === id || p._id?.toString() === id?.toString());
    if (idx !== -1) {
      places[idx] = { ...places[idx], ...update };
      return places[idx];
    }
    return null;
  },
  deletePlace: (id) => {
    const idx = places.findIndex(p => p._id === id || p._id?.toString() === id?.toString());
    if (idx !== -1) {
      return places.splice(idx, 1)[0];
    }
    return null;
  },

  getReviews: () => reviews,
  getReviewsByPlace: (placeId) => reviews.filter(r => r.item === placeId || r.item?.toString() === placeId?.toString()),
  addReview: (r) => {
    if (!r._id) r._id = "rev_" + Date.now();
    reviews.unshift(r);
    return r;
  },
  findReviewById: (id) => reviews.find(r => r._id === id || r._id?.toString() === id?.toString()),

  getAdminRequests: () => adminRequests,
  addAdminRequest: (req) => {
    if (!req._id) req._id = "req_" + Date.now();
    adminRequests.unshift(req);
    return req;
  },
  findAdminRequestById: (id) => adminRequests.find(r => r._id === id || r._id?.toString() === id?.toString()),
  resolveAdminRequest: (id, action) => {
    const r = adminRequests.find(req => req._id === id || req._id?.toString() === id?.toString());
    if (r) {
      r.status = action === 'approve' ? 'approved' : 'denied';
      return r;
    }
    return null;
  }
};
