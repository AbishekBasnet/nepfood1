# MongoDB Setup Instructions for NepFood

## 🚀 **Quick Setup Options**

### **Option 1: Local MongoDB (Recommended for Development)**

1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for Windows
   - MongoDB will run on `mongodb://localhost:27017` by default

2. **Start MongoDB Service**
   ```powershell
   # Start MongoDB service
   net start MongoDB
   
   # Or start manually if installed without service
   mongod --dbpath "C:\data\db"
   ```

3. **Seed the Database**
   ```powershell
   # Run the database seeder
   node scripts/seedDatabase.js
   ```

### **Option 2: MongoDB Atlas (Cloud Database)**

1. **Create Free Account**
   - Go to: https://www.mongodb.com/atlas
   - Sign up for free tier (512MB storage)

2. **Create Cluster**
   - Choose free tier
   - Select region closest to you
   - Create cluster

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

4. **Update Configuration**
   - Update `config/database.js` with your Atlas connection string

## 📊 **Database Structure**

### **Collections Created:**
- **users** - User accounts and authentication
- **mealkits** - Meal kit products and details

### **Sample Data Included:**
- 6 authentic Nepali meal kits
- Complete nutritional information
- Cooking instructions
- Ingredient lists

## 🛠️ **Commands**

```powershell
# Install dependencies
npm install

# Seed database with sample data
node scripts/seedDatabase.js

# Start server
npm start
```

## 🔧 **Configuration Files**

- `config/database.js` - Database connection settings
- `models/User.js` - User schema and methods
- `models/MealKit.js` - Meal kit schema and methods
- `scripts/seedDatabase.js` - Database seeding script

## 📝 **Environment Variables**

Copy `.env.example` to `.env` and update with your settings:

```env
MONGODB_URI=mongodb://localhost:27017/nepfood
SESSION_SECRET=your-secret-key
PORT=8080
```

## ✅ **Verification**

After setup, you should see:
- Server starts without errors
- Database connection successful
- Meal kits load from MongoDB
- User registration/login works

## 🔍 **Troubleshooting**

**Connection Issues:**
- Ensure MongoDB service is running
- Check firewall settings
- Verify connection string format

**Seeding Issues:**
- Make sure MongoDB is running first
- Check for existing data conflicts
- Verify network connectivity (for Atlas)

## 🎯 **Next Steps**

1. Run the seeder to populate sample data
2. Test user registration and login
3. Verify meal kits display correctly
4. Consider adding more advanced features like orders, cart, etc.