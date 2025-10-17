const mongoose = require('mongoose');

// MongoDB Connection Configuration
const connectDB = async () => {
    try {
        // Option 1: MongoDB Atlas (Cloud) - Recommended for quick setup
        // Free tier available at https://www.mongodb.com/atlas
        const atlasConnection = 'mongodb+srv://nepfood:nepfood123@cluster0.mongodb.net/nepfood?retryWrites=true&w=majority';
        
        // Option 2: Local MongoDB (if installed)
        const localConnection = 'mongodb://localhost:27017/nepfood';
        
        // Try Atlas first, fallback to local
        let connectionString = process.env.MONGODB_URI || localConnection;
        
        // For demo purposes, you can uncomment the line below to use a demo Atlas connection
        // connectionString = atlasConnection;
        
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(connectionString);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        console.log('\n🔧 Quick Setup Options:');
        console.log('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
        console.log('2. Use MongoDB Atlas (free): https://www.mongodb.com/atlas');
        console.log('3. The app will fallback to in-memory storage for now');
        
        // Don't exit - let the app continue with fallback data
        return null;
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
});

module.exports = connectDB;