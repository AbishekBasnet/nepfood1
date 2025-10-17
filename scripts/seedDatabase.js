const mongoose = require('mongoose');
const MealKit = require('../models/MealKit');
const connectDB = require('../config/database');

// Sample meal kit data to seed the database
const sampleMealKits = [
    {
        title: "Traditional Dal Bhat",
        description: "Nepal's national dish featuring lentil soup, rice, and traditional accompaniments.",
        includes: "Basmati rice, mixed lentils, seasonal vegetables, pickles, papad",
        price: 18.99,
        cookingTime: 35,
        servings: 2,
        category: "Traditional Mains",
        imageUrl: "/images/thakali.png",
        featuredMealKit: true,
        ingredients: [
            { name: "Basmati Rice", quantity: "2", unit: "cups" },
            { name: "Mixed Lentils", quantity: "1", unit: "cup" },
            { name: "Seasonal Vegetables", quantity: "300", unit: "grams" },
            { name: "Spice Mix", quantity: "1", unit: "packet" }
        ],
        instructions: [
            { step: 1, description: "Wash and soak rice for 30 minutes" },
            { step: 2, description: "Cook lentils with turmeric and salt" },
            { step: 3, description: "Prepare vegetables with traditional spices" },
            { step: 4, description: "Serve together with pickles and papad" }
        ],
        nutritionalInfo: {
            calories: 520,
            protein: 18,
            carbs: 85,
            fat: 8,
            fiber: 12
        },
        tags: ["traditional", "vegetarian", "complete-meal"]
    },
    {
        title: "Steamed Chicken Momo",
        description: "Delicate steamed dumplings filled with seasoned chicken and served with spicy chutney.",
        includes: "Momo wrappers, chicken filling, special sauce, steaming instructions",
        price: 15.99,
        cookingTime: 25,
        servings: 2,
        category: "Appetizers & Snacks",
        imageUrl: "/images/momo.jpg",
        featuredMealKit: true,
        ingredients: [
            { name: "Ground Chicken", quantity: "400", unit: "grams" },
            { name: "Momo Wrappers", quantity: "30", unit: "pieces" },
            { name: "Spice Mix", quantity: "1", unit: "packet" },
            { name: "Chutney Ingredients", quantity: "1", unit: "set" }
        ],
        instructions: [
            { step: 1, description: "Prepare chicken filling with spices" },
            { step: 2, description: "Wrap filling in momo wrappers" },
            { step: 3, description: "Steam for 15-20 minutes" },
            { step: 4, description: "Serve hot with chutney" }
        ],
        nutritionalInfo: {
            calories: 380,
            protein: 28,
            carbs: 35,
            fat: 12,
            fiber: 3
        },
        tags: ["steamed", "chicken", "dumplings"]
    },
    {
        title: "Hearty Thukpa Soup",
        description: "Warming Tibetan-style noodle soup with vegetables and aromatic spices.",
        includes: "Fresh noodles, vegetable broth base, mixed vegetables, traditional seasonings",
        price: 14.99,
        cookingTime: 20,
        servings: 2,
        category: "Traditional Mains",
        imageUrl: "/images/thukpaa.webp",
        featuredMealKit: false,
        ingredients: [
            { name: "Fresh Noodles", quantity: "200", unit: "grams" },
            { name: "Vegetable Broth", quantity: "1", unit: "packet" },
            { name: "Mixed Vegetables", quantity: "250", unit: "grams" },
            { name: "Spice Blend", quantity: "1", unit: "packet" }
        ],
        instructions: [
            { step: 1, description: "Prepare broth base" },
            { step: 2, description: "Cook vegetables until tender" },
            { step: 3, description: "Add noodles and simmer" },
            { step: 4, description: "Season and serve hot" }
        ],
        nutritionalInfo: {
            calories: 290,
            protein: 12,
            carbs: 45,
            fat: 8,
            fiber: 6
        },
        tags: ["soup", "noodles", "comfort-food"]
    },
    {
        title: "Fresh Quinoa Salad",
        description: "Nutritious quinoa salad with Himalayan herbs and seasonal vegetables.",
        includes: "Organic quinoa, fresh herbs, seasonal vegetables, house dressing",
        price: 12.99,
        cookingTime: 15,
        servings: 2,
        category: "Healthy Options",
        imageUrl: "/images/salad.jpg",
        featuredMealKit: false,
        ingredients: [
            { name: "Organic Quinoa", quantity: "1", unit: "cup" },
            { name: "Mixed Herbs", quantity: "50", unit: "grams" },
            { name: "Seasonal Vegetables", quantity: "200", unit: "grams" },
            { name: "House Dressing", quantity: "1", unit: "bottle" }
        ],
        instructions: [
            { step: 1, description: "Cook quinoa according to package instructions" },
            { step: 2, description: "Chop vegetables and herbs" },
            { step: 3, description: "Mix quinoa with vegetables" },
            { step: 4, description: "Dress salad and serve chilled" }
        ],
        nutritionalInfo: {
            calories: 220,
            protein: 8,
            carbs: 35,
            fat: 6,
            fiber: 5
        },
        tags: ["healthy", "quinoa", "fresh"]
    },
    {
        title: "Spicy Buff Choila",
        description: "Traditional grilled buffalo meat with aromatic Nepali spices and beaten rice.",
        includes: "Marinated buffalo meat, chiura (beaten rice), spice mix, garnishes",
        price: 22.99,
        cookingTime: 30,
        servings: 2,
        category: "Traditional Mains",
        imageUrl: "/images/choila.jpg",
        featuredMealKit: true,
        ingredients: [
            { name: "Buffalo Meat", quantity: "400", unit: "grams" },
            { name: "Beaten Rice", quantity: "100", unit: "grams" },
            { name: "Spice Marinade", quantity: "1", unit: "packet" },
            { name: "Garnish Mix", quantity: "1", unit: "packet" }
        ],
        instructions: [
            { step: 1, description: "Marinate meat with spices for 2 hours" },
            { step: 2, description: "Grill meat until perfectly cooked" },
            { step: 3, description: "Prepare beaten rice" },
            { step: 4, description: "Slice meat and serve with beaten rice" }
        ],
        nutritionalInfo: {
            calories: 480,
            protein: 35,
            carbs: 25,
            fat: 25,
            fiber: 3
        },
        tags: ["grilled", "spicy", "traditional"]
    },
    {
        title: "Vegetable Curry Bowl",
        description: "Rich and flavorful mixed vegetable curry with aromatic spices and rice.",
        includes: "Mixed seasonal vegetables, curry spice blend, basmati rice, cooking instructions",
        price: 16.99,
        cookingTime: 25,
        servings: 2,
        category: "Traditional Mains",
        imageUrl: "/images/currybowl.jpg",
        featuredMealKit: false,
        ingredients: [
            { name: "Mixed Vegetables", quantity: "400", unit: "grams" },
            { name: "Curry Spice Blend", quantity: "1", unit: "packet" },
            { name: "Basmati Rice", quantity: "1.5", unit: "cups" },
            { name: "Coconut Milk", quantity: "200", unit: "ml" }
        ],
        instructions: [
            { step: 1, description: "Cook rice separately" },
            { step: 2, description: "Sauté vegetables with spices" },
            { step: 3, description: "Add coconut milk and simmer" },
            { step: 4, description: "Serve curry over rice" }
        ],
        nutritionalInfo: {
            calories: 350,
            protein: 10,
            carbs: 55,
            fat: 12,
            fiber: 8
        },
        tags: ["vegetarian", "curry", "coconut"]
    },
    {
        title: "Sel Roti",
        description: "Traditional Nepali ring-shaped sweet bread, crispy outside and soft inside, perfect as a snack or appetizer.",
        includes: "Rice flour, sugar, ghee, cardamom, traditional spice mix, cooking instructions",
        price: 12.99,
        cookingTime: 45,
        servings: 4,
        category: "Appetizers & Snacks",
        imageUrl: "/images/selroti.jpg",
        featuredMealKit: false,
        ingredients: [
            { name: "Rice Flour", quantity: "2", unit: "cups" },
            { name: "Sugar", quantity: "1/4", unit: "cup" },
            { name: "Ghee", quantity: "2", unit: "tbsp" },
            { name: "Cardamom Powder", quantity: "1/2", unit: "tsp" },
            { name: "Fennel Seeds", quantity: "1", unit: "tsp" }
        ],
        instructions: [
            { step: 1, description: "Mix rice flour with sugar and spices" },
            { step: 2, description: "Add water gradually to make smooth batter" },
            { step: 3, description: "Let batter rest for 30 minutes" },
            { step: 4, description: "Heat oil and fry in ring shapes until golden" }
        ],
        nutritionalInfo: {
            calories: 280,
            protein: 4,
            carbs: 45,
            fat: 10,
            fiber: 2
        },
        tags: ["sweet", "traditional", "appetizer", "vegetarian"]
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Connect to database
        console.log('Connecting to MongoDB...');
        await connectDB();
        
        console.log('Seeding database with meal kit data...');
        
        // Clear existing meal kits
        await MealKit.deleteMany({});
        console.log('Cleared existing meal kits');
        
        // Insert sample data
        const insertedMealKits = await MealKit.insertMany(sampleMealKits);
        console.log(`✅ Successfully seeded ${insertedMealKits.length} meal kits`);
        
        // Display summary
        console.log('\n📊 Seeded Meal Kits:');
        insertedMealKits.forEach((kit, index) => {
            console.log(`${index + 1}. ${kit.title} - $${kit.price} (${kit.category})`);
        });
        
        console.log('\n🎉 Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
    } finally {
        // Close connection after a short delay
        setTimeout(async () => {
            if (mongoose.connection.readyState === 1) {
                await mongoose.connection.close();
                console.log('Database connection closed');
            }
            process.exit(0);
        }, 1000);
    }
};

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, sampleMealKits };