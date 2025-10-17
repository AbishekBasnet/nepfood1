const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

// MongoDB imports
const connectDB = require('./config/database');
const User = require('./models/User');
const MealKit = require('./models/MealKit');

// Import the meal kit utility module (for fallback)
const mealkitUtil = require('./modules/mealkit-util');

const app = express();
const PORT = 8080;

// Connect to MongoDB (graceful fallback if not available)
let mongoConnected = false;
connectDB().then(conn => {
    mongoConnected = !!conn;
    if (mongoConnected) {
        console.log('🎉 Using MongoDB for data storage');
    } else {
        console.log('⚠️  Using in-memory storage (MongoDB not available)');
    }
}).catch(err => {
    console.log('⚠️  Using in-memory storage (MongoDB connection failed)');
    mongoConnected = false;
});

// In-memory fallback storage
const users = [];

// Middleware setup
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    secret: 'nepfood-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// EJS and layout setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Middleware to make user session available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Route Handlers

// Home page route - "/"
app.get('/', async (req, res) => {
    try {
        let featuredMealKits = [];
        
        // Try MongoDB first if connected
        if (mongoConnected) {
            featuredMealKits = await MealKit.getFeatured();
        }
        
        // Fallback to utility module if no MongoDB data or not connected
        if (featuredMealKits.length === 0) {
            const allMealKits = mealkitUtil.getAllMealKits();
            featuredMealKits = mealkitUtil.getFeaturedMealKits(allMealKits);
        }
        
        res.render('home', { 
            title: 'NepFood - Authentic Nepali Meal Kits',
            featuredMealKits: featuredMealKits,
            currentPage: 'home'
        });
    } catch (error) {
        console.error('Error fetching meal kits:', error);
        // Fallback to utility module on error
        const allMealKits = mealkitUtil.getAllMealKits();
        const featuredMealKits = mealkitUtil.getFeaturedMealKits(allMealKits);
        
        res.render('home', { 
            title: 'NepFood - Authentic Nepali Meal Kits',
            featuredMealKits: featuredMealKits,
            currentPage: 'home'
        });
    }
});

// On-the-menu page route - "/on-the-menu"
app.get('/on-the-menu', async (req, res) => {
    try {
        let allMealKits = [];
        let mealKitsByCategory = [];
        
        // Try MongoDB first if connected
        if (mongoConnected) {
            allMealKits = await MealKit.find({ availability: true });
            
            if (allMealKits.length > 0) {
                // Group meal kits by category
                const categories = ['Traditional Mains', 'Appetizers & Snacks', 'Healthy Options'];
                mealKitsByCategory = categories.map(category => ({
                    category: category,
                    mealKits: allMealKits.filter(kit => kit.category === category)
                })).filter(group => group.mealKits.length > 0);
            }
        }
        
        // Fallback to utility module if no MongoDB data
        if (mealKitsByCategory.length === 0) {
            const fallbackMealKits = mealkitUtil.getAllMealKits();
            mealKitsByCategory = mealkitUtil.getMealKitsByCategory(fallbackMealKits);
        }
        
        res.render('on-the-menu', { 
            title: 'On The Menu - NepFood',
            mealKitsByCategory: mealKitsByCategory
        });
    } catch (error) {
        console.error('Error fetching meal kits:', error);
        // Fallback to utility module on error
        const allMealKits = mealkitUtil.getAllMealKits();
        const mealKitsByCategory = mealkitUtil.getMealKitsByCategory(allMealKits);
        
        res.render('on-the-menu', { 
            title: 'On The Menu - NepFood',
            mealKitsByCategory: mealKitsByCategory
        });
    }
});

// Registration page route - "/sign-up"
app.get('/sign-up', (req, res) => {
    res.render('sign-up', { 
        title: 'Sign Up - NepFood',
        error: null,
        success: null
    });
});

// Handle registration form submission
app.post('/sign-up', async (req, res) => {
    const { name, phone, email, password } = req.body;
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.render('sign-up', { 
            title: 'Sign Up - NepFood',
            error: 'Password must be at least 8 characters and contain: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&).',
            success: null
        });
    }
    
    try {
        if (mongoConnected) {
            // Use MongoDB
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.render('sign-up', { 
                    title: 'Sign Up - NepFood',
                    error: 'Email already registered. Please use a different email.',
                    success: null
                });
            }
            
            const newUser = new User({ name, phone, email, password });
            await newUser.save();
        } else {
            // Use in-memory storage
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return res.render('sign-up', { 
                    title: 'Sign Up - NepFood',
                    error: 'Email already registered. Please use a different email.',
                    success: null
                });
            }
            
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = {
                id: users.length + 1,
                name, phone, email,
                password: hashedPassword
            };
            users.push(newUser);
        }
        
        res.render('sign-up', { 
            title: 'Sign Up - NepFood',
            error: null,
            success: 'Registration successful! You can now log in.'
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.render('sign-up', { 
            title: 'Sign Up - NepFood',
            error: 'Registration failed. Please try again.',
            success: null
        });
    }
});

// Login page route - "/log-in"
app.get('/log-in', (req, res) => {
    res.render('log-in', { 
        title: 'Log In - NepFood',
        error: null
    });
});

// Handle login form submission
app.post('/log-in', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let user = null;
        let passwordMatch = false;
        
        if (mongoConnected) {
            // Use MongoDB
            user = await User.findOne({ email: email.toLowerCase() });
            if (user) {
                passwordMatch = await user.comparePassword(password);
            }
        } else {
            // Use in-memory storage
            user = users.find(user => user.email === email);
            if (user) {
                passwordMatch = await bcrypt.compare(password, user.password);
            }
        }
        
        if (!user || !passwordMatch) {
            return res.render('log-in', { 
                title: 'Log In - NepFood',
                error: 'Invalid email or password.'
            });
        }
        
        // Store user in session
        req.session.user = {
            id: mongoConnected ? user._id : user.id,
            name: user.name,
            email: user.email
        };
        
        res.redirect('/');
        
    } catch (error) {
        console.error('Login error:', error);
        res.render('log-in', { 
            title: 'Log In - NepFood',
            error: 'Login failed. Please try again.'
        });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found',
        layout: 'layout'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { 
        title: '500 - Server Error',
        layout: 'layout'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`NepFood server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});