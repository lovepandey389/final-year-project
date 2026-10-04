# 🌆 CityBuddy | Smart Travel & Local Discovery Platform

[![Live Demo](https://img.shields.io/badge/Live%20App-city--buddy.vercel.app-blue?style=for-the-badge&logo=vercel)](https://city-buddy.vercel.app/)
[![Backend Status](https://img.shields.io/badge/Live%20API-city--buddy.onrender.com-green?style=for-the-badge&logo=render)](https://city-buddy.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-final--year--project-181717?style=for-the-badge&logo=github)](https://github.com/lovepandey389/final-year-project)

> **Final Year Engineering Project**  
> A full-stack travel and local city exploration web platform connecting travelers to verified stays, boutique cafés, iconic dining spots, and cultural landmarks with interactive maps, gamified reviews, and admin management.

---

## 🌐 Live Deployments

- 🚀 **Live Frontend Application:** [https://city-buddy.vercel.app/](https://city-buddy.vercel.app/)
- 📡 **Live Production API:** [https://city-buddy.onrender.com](https://city-buddy.onrender.com)
- 📂 **Source Code Repository:** [https://github.com/lovepandey389/final-year-project](https://github.com/lovepandey389/final-year-project)

---

## 🏗️ Project Architecture

The project is structured with a clean separation of concerns between client and server:

```
final-year-project/
├── frontend/                     # Client application (React + Vite + Tailwind CSS)
│   ├── assets/                   # Bundled production modules, chunks & styles
│   ├── public/                   # Static logos, wallpapers, manifest
│   ├── index.html                # Entry point with dual-mode API switch
│   ├── package.json              # Frontend dependencies and scripts
│   └── vite.config.js            # Vite configuration
│
├── backend/                      # REST API Server (Node.js + Express + MongoDB)
│   ├── config/
│   │   ├── db.js                 # MongoDB connection with zero-config in-memory fallback
│   │   └── store.js              # Reactive in-memory database store
│   ├── controllers/              # Business logic handlers
│   │   ├── authController.js     # User authentication, favorites, profile
│   │   ├── placeController.js    # Place discovery, filtering, pagination, search
│   │   ├── reviewController.js   # User reviews, ratings, votes & replies
│   │   └── adminController.js    # Admin approvals and request resolution
│   ├── models/                   # Mongoose schemas (User, Place, Review, AdminRequest)
│   ├── routes/                   # Modular Express routes
│   ├── middleware/               # JWT authentication and Admin authorization
│   ├── data/                     # Seed data with 16+ verified destinations
│   ├── server.js                 # Express server bootstrap
│   ├── package.json              # Backend dependencies and scripts
│   └── .env.example              # Sample environment configuration
│
├── .gitignore                    # Git exclusions
├── package.json                  # Root runner scripts
└── README.md                     # Comprehensive project documentation
```

---

## 🚀 Key Features

### 1. 🔍 Exploration & Multi-Category Discovery
- Discover curated places in 5 distinct categories: **Restaurants**, **Cafes**, **Attractions**, **Hotels**, and **Guesthouses**.
- Multi-parameter filtering by city, category, keywords, price, and ratings.
- Instant search across cities with responsive results grouping.

### 2. 🗺️ Interactive Maps & Geo-coordinates
- Visual geospatial view mapping places across major Indian hubs (Delhi, Mumbai, Bengaluru, Jaipur, Goa, Varanasi).
- Detailed address, contact numbers, and official website links.

### 3. 🔐 Authentication & Role-Based Access Control (RBAC)
- Secure user registration and login with bcrypt password hashing and JSON Web Tokens (JWT).
- Role segregation: Standard **User** and **Admin**.
- Admin request review workflow and secure admin registration code.

### 4. 🏆 Gamification (Points & Badges)
- Users earn activity points for community contributions (e.g., +25 points per verified review).
- Automatic badge milestones: *New Explorer*, *City Scout*, *Elite Reviewer*, *Super Admin*.

### 5. ⭐ Community Reviews & Interactions
- 5-star rating system with verified review timestamps.
- Community voting (upvotes for helpful recommendations).
- Threaded replies to reviews.

### 6. 🛠️ Comprehensive Admin Dashboard
- Manage listings: Create, edit, and remove places.
- Moderation queue: Review claims, edit suggestions, and user admin access requests.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, React Router DOM v6, Vite, Tailwind CSS, Lucide Icons, React Hook Form, React Hot Toast |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT (`jsonwebtoken`), BCrypt.js, Morgan, CORS |
| **Deployment** | Vercel (Frontend), Render (Backend Cloud) |

---

## ⚡ Quick Start Guide (Run Locally)

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- *(Optional)* **MongoDB** (If MongoDB is not installed, the backend automatically runs with its built-in in-memory database!)

---

### Step 1: Clone Repository
```bash
git clone https://github.com/lovepandey389/final-year-project.git
cd final-year-project
```

---

### Step 2: Start Backend Server

1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment file:
   ```bash
   cp .env.example .env
   ```
4. *(Optional)* Seed initial data to MongoDB (if running local MongoDB):
   ```bash
   npm run seed
   ```
5. Start the backend:
   ```bash
   npm start
   ```
   *The backend will start at `http://localhost:5000`.*

---

### Step 3: Start Frontend Application

1. Open a new terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser at **`http://localhost:3000`**.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@citybuddy.com` | `admin123` |
| **Standard User** | `user@citybuddy.com` | `user123` |

*(Admin registration code for creating new admin accounts: `CITYBUDDY_ADMIN_2026`)*

---

## 📡 API Reference Summary

### Authentication & Users
- `POST /user/signup` - Register a new account
- `POST /user/login` - Authenticate and receive JWT token
- `GET  /user/me` - Get profile of authenticated user
- `PUT  /user/update-password` - Update current password
- `POST /user/request-admin` - Submit admin privileges request
- `GET  /user/favorites` - Get user saved favorite places
- `POST /user/favorites/:id` - Toggle favorite place bookmark

### Places & Discovery
- `GET    /home` - Retrieve featured top-rated and newly added places
- `GET    /search?q=query` - Global multi-category keyword search
- `GET    /places` - Get places with filtering (`category`, `city`, `sort`, `page`)
- `GET    /places/:id` - Get place details
- `POST   /places` - Add a new destination *(Admin only)*
- `PUT    /places/:id` - Update place details *(Admin only)*
- `DELETE /places/:id` - Remove place *(Admin only)*
- `POST   /places/:id/suggest-edit` - Submit edit suggestion for a place
- `POST   /claims` - Claim business ownership for a place

### Reviews & Moderation
- `GET  /reviews/:placeId` - Get reviews for a place
- `POST /reviews` - Post a new review & earn points
- `POST /reviews/:id/vote` - Upvote a helpful review
- `POST /reviews/:id/reply` - Post a reply to a review
- `GET  /admin/requests` - View pending admin & claim requests *(Admin only)*
- `PUT  /admin/requests/:id` - Approve or deny admin requests *(Admin only)*

---

## 📜 License & Credits

- Developed for Final Year Engineering Capstone Project.
- Live Reference: [CityBuddy on Vercel](https://city-buddy.vercel.app/)
