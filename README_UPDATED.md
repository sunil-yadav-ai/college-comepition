# 🍔 FoodHub - Food Ordering System

A full-stack food ordering website similar to Swiggy/Zomato with React frontend and Node.js backend. Features a modern, user-friendly interface with browsing, cart management, checkout, and order confirmation.

## ✨ Features

### Home Page
✅ Attractive navbar with smooth navigation
✅ Hero section with images
✅ Why choose us section
✅ Popular items showcase with images and prices  
✅ How it works step-by-step guide
✅ Customer testimonials
✅ Call-to-action buttons
✅ Footer with contact info and links
✅ Fully responsive design

### Menu Page
✅ Browse items by 5 categories (Burgers, Pizza, Beverages, Desserts, Combo Meals)
✅ Search functionality to filter items
✅ 20+ delicious food items with images
✅ Item details: Name, Price, Rating, Delivery Time
✅ Add to cart button on each item

### Shopping Cart
✅ View all selected items with images
✅ Increase/decrease quantity with +/- buttons
✅ Remove items from cart
✅ Real-time price calculations
✅ Subtotal, Delivery Fee, Tax display
✅ Final total amount

### Checkout
✅ Customer information form (Name, Mobile, Order Type)
✅ Order review with all items
✅ Final bill summary
✅ Secure order placement

### Order Confirmation
✅ Order number display
✅ Order details and items
✅ Total bill amount
✅ Estimated preparation time
✅ Order status tracking visualization

## 📁 Project Structure

```
chat/
├── frontend/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx              # Home page with navbar & sections
│   │   │   ├── Menu.jsx              # Menu browsing page
│   │   │   ├── Cart.jsx              # Shopping cart page
│   │   │   ├── Checkout.jsx          # Checkout page
│   │   │   └── Confirmation.jsx      # Order confirmation page
│   │   ├── styles/
│   │   │   ├── Home.css              # Home page styling
│   │   │   ├── Menu.css              # Menu page styling
│   │   │   ├── Cart.css              # Cart page styling
│   │   │   ├── Checkout.css          # Checkout styling
│   │   │   └── Confirmation.css      # Confirmation page styling
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # App-level styles
│   │   ├── main.jsx                  # React entry point
│   │   ├── api.js                    # API client setup
│   │   └── styles.css                # Global styles
│   ├── index.html                    # HTML template
│   ├── vite.config.js                # Vite configuration
│   ├── package.json                  # Frontend dependencies
│   └── .gitignore
│
└── backend/                           # Node.js Backend (Express)
    ├── models/
    │   ├── MenuItem.js               # Menu item model
    │   └── Order.js                  # Order model
    ├── routes/
    │   ├── menuRoutes.js             # Menu API routes
    │   └── orderRoutes.js            # Order API routes
    ├── server.js                     # Express server
    ├── package.json                  # Backend dependencies
    ├── .env                          # Environment variables
    └── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or Atlas cloud)

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure MongoDB

Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod
```

Or use MongoDB Atlas cloud database (update .env with connection string)

### Step 3: Start Backend Server

**Terminal 1:**
```bash
cd backend
npm start
```

✅ Backend runs on: `http://localhost:5000`
✅ API available at: `http://localhost:5000/api`

### Step 4: Start Frontend Server

**Terminal 2:**
```bash
cd frontend
npm run dev
```

✅ Frontend runs on: `http://localhost:3000`

### Step 5: Open in Browser

Open `http://localhost:3000` in your browser and start ordering! 🎉

## 📋 How to Use

1. **Home Page**: Explore features and popular items
2. **Order Now**: Click "Start Order" or "Order Now" button
3. **Browse Menu**: Select category and items
4. **Add to Cart**: Click "Add to Cart" on any item
5. **View Cart**: Review items and modify quantities
6. **Checkout**: Enter your details and review bill
7. **Confirm Order**: Complete your order
8. **View Confirmation**: See order number and estimated time

## 🔌 API Endpoints

### Menu Routes
- `GET /api/menu` - Get all menu items
- `GET /api/menu/category/:category` - Get items by category
- `POST /api/menu/init` - Initialize menu items

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get specific order

## 🍽️ Menu Items Available

**Burgers** (₹149-₹229)
- Cheese Burger, Bacon Burger, Mushroom Burger, Double Cheese Burger

**Pizza** (₹249-₹329)
- Margherita, Pepperoni, Veggie, BBQ Chicken

**Beverages** (₹49-₹99)
- Coca Cola, Orange Juice, Iced Tea, Mango Shake

**Desserts** (₹89-₹149)
- Chocolate Cake, Ice Cream, Brownie, Cheesecake

**Combo Meals** (₹199-₹999)
- Burger Combo, Pizza Combo, Family Pack, Party Pack

## 🛠️ Technologies

**Frontend:**
- React 18 with Hooks
- Vite (fast build tool)
- Axios (HTTP client)
- CSS3 (responsive design)
- Local Storage (cart persistence)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- UUID (unique IDs)
- CORS (cross-origin requests)

## 💾 Data Storage

- **Cart**: Browser's localStorage (persists on page reload)
- **Orders**: MongoDB database
- **Menu Items**: MongoDB database (auto-initialized on first run)

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px)
- ✅ Mobile (320px+)

## 🎨 Features Highlight

### Beautiful UI
- Modern gradient design with orange/red theme
- Smooth animations and transitions
- Hover effects on buttons and cards
- Clean, organized layout

### User Experience
- Intuitive navigation
- Real-time price updates
- Form validation
- Error messages
- Loading states

### Performance
- Fast page loads with Vite
- Optimized images from Unsplash
- Lazy loading ready
- Efficient state management

## ⚙️ Configuration

### Backend .env file:
```
MONGODB_URI=mongodb://localhost:27017/food-ordering
PORT=5000
NODE_ENV=development
```

### Frontend API Base URL:
```javascript
// In src/api.js
API_BASE_URL = 'http://localhost:5000/api'
```

## 🔍 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check MongoDB URI in `.env` file
- Verify MongoDB is listening on port 27017

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check CORS is enabled in Express
- Verify API URL in `frontend/src/api.js`

### Port Already in Use
```bash
# Change port in .env (backend) or vite.config.js (frontend)
```

### Module Not Found
```bash
# Reinstall dependencies
npm install
```

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Support

For issues or questions, please check the code comments or review the README.

---

**Made with ❤️ for food lovers everywhere! Enjoy your order! 🍕🍔🍰**
