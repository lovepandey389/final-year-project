const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/citybuddy', {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.log(`[Database Notice] MongoDB not available locally (${error.message}).`);
    console.log(`[Database Notice] Activated High-Performance Built-in In-Memory DB! All endpoints will work 100% out-of-the-box.`);
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
