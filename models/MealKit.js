const mongoose = require('mongoose');

// MealKit Schema Definition
const mealKitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Meal kit title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    includes: {
        type: String,
        required: [true, 'Includes field is required'],
        maxlength: [200, 'Includes cannot exceed 200 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be positive']
    },
    cookingTime: {
        type: Number,
        required: [true, 'Cooking time is required'],
        min: [1, 'Cooking time must be at least 1 minute']
    },
    servings: {
        type: Number,
        required: [true, 'Number of servings is required'],
        min: [1, 'Must serve at least 1 person']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Traditional Mains', 'Appetizers & Snacks', 'Healthy Options'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true
    },
    featuredMealKit: {
        type: Boolean,
        default: false
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: String,
            required: true,
            trim: true
        },
        unit: {
            type: String,
            required: true,
            trim: true
        }
    }],
    instructions: [{
        step: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxlength: [300, 'Instruction cannot exceed 300 characters']
        }
    }],
    nutritionalInfo: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number
    },
    tags: [String],
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for better search performance
mealKitSchema.index({ category: 1, featuredMealKit: 1 });
mealKitSchema.index({ title: 'text', description: 'text' });

// Static method to get featured meal kits
mealKitSchema.statics.getFeatured = function() {
    return this.find({ featuredMealKit: true, availability: true });
};

// Static method to get by category
mealKitSchema.statics.getByCategory = function(category) {
    return this.find({ category: category, availability: true });
};

const MealKit = mongoose.model('MealKit', mealKitSchema);

module.exports = MealKit;