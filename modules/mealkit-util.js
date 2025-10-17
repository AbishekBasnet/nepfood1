// Sample meal kit data for NepFood
const mealkits = [
    {
        title: "Traditional Dal Bhat with Gundruk",
        includes: "Organic Lentils, Basmati Rice & Fermented Greens",
        description: "Nepal's national dish featuring perfectly spiced lentil curry served with fragrant rice and traditional fermented vegetables.",
        category: "Traditional Nepali Classics",
        price: 18.99,
        cookingTime: 35,
        servings: 2,
        imageUrl: "/images/thakali.png",
        featuredMealKit: true
    },
    {
        title: "Chicken Momo with Traditional Chutney",
        includes: "Fresh Dumpling Wrappers & Authentic Spice Mix",
        description: "Handcrafted steamed dumplings filled with seasoned chicken, served with spicy tomato-sesame chutney.",
        category: "Traditional Nepali Classics",
        price: 21.99,
        cookingTime: 45,
        servings: 2,
        imageUrl: "/images/momo.jpg",
        featuredMealKit: true
    },
    {
        title: "Buff Choila with Chiura",
        includes: "Marinated Buffalo Meat & Beaten Rice",
        description: "Spicy grilled buffalo meat served with beaten rice, a popular Newari delicacy from Kathmandu.",
        category: "Traditional Nepali Classics",
        price: 24.99,
        cookingTime: 30,
        servings: 2,
        imageUrl: "/images/choila.jpg",
        featuredMealKit: false
    },
    {
        title: "Thukpa Noodle Soup",
        includes: "Fresh Noodles & Himalayan Spice Blend",
        description: "Hearty Tibetan-style noodle soup with vegetables and aromatic spices, perfect for cold days.",
        category: "Traditional Nepali Classics",
        price: 16.99,
        cookingTime: 25,
        servings: 2,
        imageUrl: "/images/thukpaa.webp",
        featuredMealKit: true
    },
    {
        title: "Vegetable Curry Bowl",
        includes: "Seasonal Mixed Vegetables & Curry Spices",
        description: "Fresh seasonal vegetables cooked in traditional Nepali curry style with aromatic spices and herbs.",
        category: "Healthy Vegetarian",
        price: 15.99,
        cookingTime: 20,
        servings: 2,
        imageUrl: "/images/currybowl.jpg",
        featuredMealKit: false
    },
    {
        title: "Himalayan Quinoa Salad",
        includes: "Organic Quinoa & Fresh Mountain Herbs",
        description: "Nutritious quinoa salad with fresh vegetables and herbs, inspired by high-altitude Himalayan cuisine.",
        category: "Healthy Vegetarian",
        price: 17.99,
        cookingTime: 15,
        servings: 2,
        imageUrl: "/images/salad.jpg",
        featuredMealKit: true
    }
];

/**
 * Returns all meal kits
 * @returns {Array} Array of all meal kit objects
 */
function getAllMealKits() {
    return mealkits;
}

/**
 * Filters meal kits to return only featured ones
 * @param {Array} mealkits - Array of meal kit objects
 * @returns {Array} Array of featured meal kit objects
 */
function getFeaturedMealKits(mealkits) {
    return mealkits.filter(mealkit => mealkit.featuredMealKit === true);
}

/**
 * Groups meal kits by category
 * @param {Array} mealkits - Array of meal kit objects
 * @returns {Array} Array of objects with category and mealKits properties
 */
function getMealKitsByCategory(mealkits) {
    // Get unique categories
    const categories = [...new Set(mealkits.map(mealkit => mealkit.category))];
    
    // Group meal kits by category
    return categories.map(category => {
        return {
            category: category,
            mealKits: mealkits.filter(mealkit => mealkit.category === category)
        };
    });
}

module.exports = {
    getAllMealKits,
    getFeaturedMealKits,
    getMealKitsByCategory
};