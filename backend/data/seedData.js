const places = [
  // Restaurants
  {
    _id: "65f01a1a1111111111111101",
    name: "Karim's Historic Mughlai",
    category: "Restaurant",
    city: "Delhi",
    address: "16, Gali Kababian, Jama Masjid, Old Delhi, Delhi 110006",
    description: "Legendary restaurant near Jama Masjid serving authentic royal Mughlai cuisine, kebabs, and mutton nihari since 1913.",
    price: 850,
    rating: 4.8,
    reviewsCount: 320,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    phone: "+91 11 2326 9880",
    website: "https://karimshotels.com",
    location: {
      type: "Point",
      coordinates: [77.2333, 28.6507]
    },
    amenities: ["Dine-in", "Takeaway", "Halal Certified", "Historic Heritage"]
  },
  {
    _id: "65f01a1a1111111111111102",
    name: "Bukhara at ITC Maurya",
    category: "Restaurant",
    city: "Delhi",
    address: "ITC Maurya, Diplomatic Enclave, Sardar Patel Marg, New Delhi 110021",
    description: "World-renowned restaurant celebrated for its signature Dal Bukhara and clay-oven tandoori delicacies.",
    price: 4500,
    rating: 4.9,
    reviewsCount: 512,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    phone: "+91 11 2611 2233",
    website: "https://itchotels.com",
    location: {
      type: "Point",
      coordinates: [77.1734, 28.5983]
    },
    amenities: ["Fine Dining", "Valet Parking", "Air Conditioned", "Full Bar"]
  },
  {
    _id: "65f01a1a1111111111111103",
    name: "Britto's Seafood Shack",
    category: "Restaurant",
    city: "Goa",
    address: "Baga Beach, Calangute, Goa 403516",
    description: "Famous beachfront shack at Baga Beach known for butter garlic crab, grilled lobster, chilled cocktails, and live music.",
    price: 1200,
    rating: 4.6,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    phone: "+91 832 227 7331",
    website: "https://brittosgoa.com",
    location: {
      type: "Point",
      coordinates: [73.7517, 15.5553]
    },
    amenities: ["Beachfront View", "Outdoor Seating", "Live Music", "Bar"]
  },
  {
    _id: "65f01a1a1111111111111104",
    name: "Vidyarthi Bhavan",
    category: "Restaurant",
    city: "Bengaluru",
    address: "32, Gandhi Bazaar Main Rd, Basavanagudi, Bengaluru 560004",
    description: "Iconic South Indian tiffin room famous since 1943 for its crisp, golden Masala Dosas and aromatic filter coffee.",
    price: 250,
    rating: 4.7,
    reviewsCount: 890,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    phone: "+91 80 2667 7588",
    website: "https://vidyarthibhavan.in",
    location: {
      type: "Point",
      coordinates: [77.5713, 12.9431]
    },
    amenities: ["Vegetarian", "Fast Service", "Traditional Heritage"]
  },

  // Cafes
  {
    _id: "65f01a1a1111111111111105",
    name: "Blue Tokai Coffee Roasters",
    category: "Cafe",
    city: "Delhi",
    address: "Saidulajab, Lane 3, Westend Marg, Saket, New Delhi 110030",
    description: "Specialty coffee roastery in the Champa Gali arts district serving single-origin pour-overs, cold brews, and artisan croissants.",
    price: 450,
    rating: 4.7,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    phone: "+91 98211 24400",
    website: "https://bluetokaicoffee.com",
    location: {
      type: "Point",
      coordinates: [77.1989, 28.5144]
    },
    amenities: ["Free Wi-Fi", "Pet Friendly", "Specialty Coffee", "Outdoor Seating"]
  },
  {
    _id: "65f01a1a1111111111111106",
    name: "Subko Specialty Coffee & Bakehouse",
    category: "Cafe",
    city: "Mumbai",
    address: "Craven Hall, Byramji Jijibhoy Rd, Bandra West, Mumbai 400050",
    description: "A hip Bandra bakery and specialty coffee sanctuary championing South Asian estate-grown beans and sourdough treats.",
    price: 600,
    rating: 4.8,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    phone: "+91 90047 00654",
    website: "https://subko.co",
    location: {
      type: "Point",
      coordinates: [72.8258, 19.0596]
    },
    amenities: ["Artisan Pastries", "Wi-Fi", "Co-working friendly", "Cold Brew"]
  },
  {
    _id: "65f01a1a1111111111111107",
    name: "Tapri Central",
    category: "Cafe",
    city: "Jaipur",
    address: "B4-E, Prithviraj Road, C Scheme, Jaipur 302001",
    description: "Rooftop chai lounge overlooking Central Park, serving cutting chai, Bun Maska, Maggi varieties, and fusion snacks.",
    price: 400,
    rating: 4.6,
    reviewsCount: 650,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    phone: "+91 141 401 1777",
    website: "https://tapri.net",
    location: {
      type: "Point",
      coordinates: [75.8078, 26.9038]
    },
    amenities: ["Rooftop View", "Vegetarian", "Outdoor Terrace", "Chai Specials"]
  },

  // Attractions
  {
    _id: "65f01a1a1111111111111108",
    name: "Hawa Mahal - Palace of Winds",
    category: "Attraction",
    city: "Jaipur",
    address: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Jaipur 302002",
    description: "Iconic five-story pink sandstone palace with 953 intricately carved jharokhas (casements) built in 1799.",
    price: 200,
    rating: 4.8,
    reviewsCount: 1540,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    phone: "+91 141 261 8862",
    website: "https://rajasthantourism.gov.in",
    location: {
      type: "Point",
      coordinates: [75.8267, 26.9239]
    },
    amenities: ["Audio Tour", "Photography Spot", "Historical Monument", "Guided Walks"]
  },
  {
    _id: "65f01a1a1111111111111109",
    name: "Gateway of India",
    category: "Attraction",
    city: "Mumbai",
    address: "Apollo Bandar, Colaba, Mumbai 400001",
    description: "Majestic arch monument overlooking the Arabian Sea, built in the Indo-Saracenic architectural style during the 20th century.",
    price: 0,
    rating: 4.7,
    reviewsCount: 2200,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    phone: "+91 22 2284 3989",
    website: "https://mumbaicity.gov.in",
    location: {
      type: "Point",
      coordinates: [72.8347, 18.9220]
    },
    amenities: ["Scenic Sea View", "Ferry Rides to Elephanta", "Public Promenade"]
  },
  {
    _id: "65f01a1a1111111111111110",
    name: "Dashashwamedh Ghat & Ganga Aarti",
    category: "Attraction",
    city: "Varanasi",
    address: "Dashashwamedh Ghat Rd, Bangali Tola, Varanasi 221001",
    description: "The primary and most vibrant ghat on the Ganges River, famous for its magnificent evening spiritual Ganga Aarti ceremony.",
    price: 0,
    rating: 4.9,
    reviewsCount: 1890,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    phone: "+91 542 250 5033",
    website: "https://varanasi.nic.in",
    location: {
      type: "Point",
      coordinates: [83.0105, 25.3076]
    },
    amenities: ["Boat Rides", "Spiritual Rituals", "Photography", "Cultural Tour"]
  },

  // Hotels
  {
    _id: "65f01a1a1111111111111111",
    name: "The Taj Mahal Palace & Tower",
    category: "Hotel",
    city: "Mumbai",
    address: "Apollo Bunder, Colaba, Mumbai 400001",
    description: "Iconic luxury heritage hotel standing proudly opposite the Gateway of India with royal suites, spa, and sea-view restaurants.",
    price: 18500,
    rating: 4.9,
    reviewsCount: 980,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    phone: "+91 22 6665 3366",
    website: "https://tajhotels.com",
    location: {
      type: "Point",
      coordinates: [72.8333, 18.9217]
    },
    amenities: ["Swimming Pool", "Spa & Wellness", "Fine Dining", "Sea View", "Concierge"]
  },
  {
    _id: "65f01a1a1111111111111112",
    name: "Rambagh Palace Heritage Hotel",
    category: "Hotel",
    city: "Jaipur",
    address: "Bhawani Singh Rd, Rambagh, Jaipur 302005",
    description: "Former residence of the Maharaja of Jaipur, offering marble corridors, manicured Mughal gardens, and peacocks on the lawn.",
    price: 24000,
    rating: 4.9,
    reviewsCount: 650,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    phone: "+91 141 221 1919",
    website: "https://tajhotels.com/rambagh",
    location: {
      type: "Point",
      coordinates: [75.8083, 26.8972]
    },
    amenities: ["Royal Heritage", "Jiva Spa", "Golf Course", "Polo Lounge", "Butler Service"]
  },
  {
    _id: "65f01a1a1111111111111113",
    name: "Alila Diwa South Goa",
    category: "Hotel",
    city: "Goa",
    address: "48/10, Village Adao, Majorda, Goa 403713",
    description: "Contemporary resort set amidst lush paddy fields in South Goa, featuring an infinity pool and serene tropical spa.",
    price: 9500,
    rating: 4.7,
    reviewsCount: 410,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    phone: "+91 832 274 6800",
    website: "https://hyatt.com",
    location: {
      type: "Point",
      coordinates: [73.9167, 15.3167]
    },
    amenities: ["Infinity Pool", "Free Breakfast", "Paddy Field View", "Kid's Club"]
  },

  // Guesthouses
  {
    _id: "65f01a1a1111111111111114",
    name: "Bunk Stop Jaipur Backpacker Haven",
    category: "Guesthouse",
    city: "Jaipur",
    address: "Plot 3, Opposite Sahkar Bhawan, 22 Godam Circle, Jaipur 302006",
    description: "Cozy and vibrant traveler guesthouse with shared rooftop cafe, dormitory and private rooms, and city tour arrangements.",
    price: 750,
    rating: 4.5,
    reviewsCount: 190,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    phone: "+91 97845 11223",
    website: "https://bunkstop.com",
    location: {
      type: "Point",
      coordinates: [75.7981, 26.8920]
    },
    amenities: ["Free Wi-Fi", "Common Lounge", "Rooftop Cafe", "Luggage Storage"]
  },
  {
    _id: "65f01a1a1111111111111115",
    name: "Scindhia Guesthouse at River Ghats",
    category: "Guesthouse",
    city: "Varanasi",
    address: "Scindhia Ghat, Near Manikarnika, Varanasi 221001",
    description: "Quiet riverside guesthouse perched atop ancient stone steps with panoramic sunrise views over the holy river Ganges.",
    price: 1100,
    rating: 4.6,
    reviewsCount: 280,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    phone: "+91 542 242 0319",
    website: "https://scindhiaguesthouse.in",
    location: {
      type: "Point",
      coordinates: [83.0167, 25.3110]
    },
    amenities: ["River View Balcony", "Rooftop Dining", "Hot Water", "Yoga Sessions"]
  },
  {
    _id: "65f01a1a1111111111111116",
    name: "Fontainhas Heritage Homestay",
    category: "Guesthouse",
    city: "Goa",
    address: "Rua 31 de Janeiro, Latin Quarter, Panaji, Goa 403001",
    description: "Charming Portuguese colonial villa converted into an intimate boutique homestay with antique rosewood furniture and balconies.",
    price: 2400,
    rating: 4.8,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    phone: "+91 832 242 1234",
    website: "https://fontainhashomestay.com",
    location: {
      type: "Point",
      coordinates: [73.8315, 15.4989]
    },
    amenities: ["Heritage Decor", "Continental Breakfast", "Air Conditioned", "Library"]
  }
];

module.exports = places;
