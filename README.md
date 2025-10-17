# NepFood - Authentic Nepali Meal Kits

A Node.js web application for a Nepali-themed meal kit delivery service, built with Express.js and EJS templating.

## Features

- **Home Page**: Welcome page with featured meal kits and company information
- **Menu Page**: Complete menu organized by categories
- **User Authentication**: Registration and login system with bcrypt password hashing
- **Responsive Design**: Mobile-friendly design using Tailwind CSS
- **Session Management**: User sessions for maintaining login state

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS with express-ejs-layouts
- **Styling**: Tailwind CSS with custom Nepali-themed colors
- **Authentication**: bcrypt for password hashing, express-session for session management
- **No Database**: Uses in-memory storage for this assignment

## Project Structure

```
├── modules/
│   └── mealkit-util.js     # Meal kit data and utility functions
├── views/
│   ├── layout.ejs          # Main layout template
│   ├── home.ejs           # Home page
│   ├── on-the-menu.ejs    # Menu page
│   ├── sign-up.ejs        # Registration page
│   ├── log-in.ejs         # Login page
│   ├── 404.ejs            # 404 error page
│   └── 500.ejs            # 500 error page
├── public/
│   ├── css/
│   │   └── style.css      # Custom CSS styles
│   └── images/            # Image placeholder files
├── server.js              # Main server file
└── package.json           # Dependencies and scripts
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   Open your browser and go to `http://localhost:8080`

## Routes

- `/` - Home page with featured meal kits
- `/on-the-menu` - Full menu organized by categories
- `/sign-up` - User registration page
- `/log-in` - User login page

## Meal Kit Module

The `modules/mealkit-util.js` file contains:

- **mealkits**: Array of meal kit objects with properties:
  - title (String)
  - includes (String)
  - description (String)
  - category (String)
  - price (Number)
  - cookingTime (Number)
  - servings (Number)
  - imageUrl (String)
  - featuredMealKit (Boolean)

- **Functions**:
  - `getAllMealKits()`: Returns all meal kits
  - `getFeaturedMealKits(mealkits)`: Returns only featured meal kits
  - `getMealKitsByCategory(mealkits)`: Returns meal kits grouped by category

## Authentication

- Registration requires: name, phone, email, password
- Passwords are hashed using bcrypt with 10 salt rounds
- Sessions are managed using express-session
- In-memory user storage (no database)

## Design Features

- Nepali-themed color scheme (red, blue, saffron, mountain white)
- Responsive design that works on mobile and desktop
- Hover effects and smooth transitions
- Himalayan-inspired branding and imagery
- Clean, modern interface

## Testing the Application

1. Navigate to the home page to see featured meal kits
2. Visit the menu page to see all meal kits organized by category
3. Register a new account using the sign-up form
4. Log in with your credentials
5. Notice how the navigation changes when logged in

## Future Enhancements

- Database integration (MongoDB/MySQL)
- Shopping cart functionality
- Order management system
- Payment processing
- User profile management
- Email notifications

## Assignment Requirements Met

✅ Express server on port 8080  
✅ EJS templating with layouts  
✅ Required routes: /, /on-the-menu, /sign-up, /log-in  
✅ Node.js module with meal kit data and functions  
✅ Responsive design with Tailwind CSS  
✅ User authentication with bcrypt  
✅ No frontend frameworks used  
✅ Nepali-themed original branding  

## Author

Created for Seneca college
