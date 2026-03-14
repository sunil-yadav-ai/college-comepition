# Food Ordering System

A full-stack food ordering website similar to Swiggy/Zomato with React frontend and Node.js backend.

## Project Structure

```
chat/
├── frontend/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── Confirmation.jsx
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Menu.css
│   │   │   ├── Cart.css
│   │   │   ├── Checkout.css
│   │   │   └── Confirmation.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── api.js
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/           # Node.js/Express backend
    ├── models/
    │   ├── MenuItem.js
    │   └── Order.js
    ├── routes/
    │   ├── menuRoutes.js
    │   └── orderRoutes.js
    ├── server.js
    ├── package.json
    ├── .env
    └── .gitignore
```

## Features

✅ **Home Page** - Restaurant banner with "Start Order" button
✅ **Menu Page** - Browse items by categories (Burgers, Pizza, Beverages, etc.)
✅ **Shopping Cart** - Add/remove items, modify quantities
✅ **Checkout** - Customer details form
✅ **Order Confirmation** - Order number, items, total bill, estimated time
✅ **Search & Filter** - Search items within categories
✅ **Responsive Design** - Mobile-friendly interface
✅ **Local Storage** - Cart persistence
✅ **Real-time Updates** - Price calculations and totals

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env` file (already provided):
   ```
   MONGODB_URI=mongodb://localhost:27017/food-ordering
   PORT=5000
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## Usage

1. **Start both servers**:
   - Backend: `npm start` (from backend folder)
   - Frontend: `npm run dev` (from frontend folder)

2. **Browse the application**:
   - Open browser to `http://localhost:3000`
   - Click "Start Order" on home page
   - Browse menu by categories
   - Add items to cart
   - Modify quantities using +/- buttons
   - View total bill in cart summary
   - Proceed to checkout
   - Enter customer details
   - Confirm order
   - View order confirmation with order number

## API Endpoints

### Menu Routes
- `GET /api/menu` - Get all menu items
- `GET /api/menu/category/:category` - Get items by category
- `POST /api/menu/init` - Initialize menu items (run once)

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get specific order

## Technologies Used

### Frontend
- React 18
- Vite
- Axios
- CSS3 (Responsive Design)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Menu Items Available

- **Burgers**: Cheese Burger, Bacon Burger, Mushroom Burger, Double Cheese Burger
- **Pizza**: Margherita, Pepperoni, Veggie, BBQ Chicken
- **Beverages**: Coca Cola, Orange Juice, Iced Tea, Mango Shake
- **Desserts**: Chocolate Cake, Ice Cream, Brownie, Cheesecake
- **Combo Meals**: Various combo packages

## Notes

- First time menu load initializes 20 pre-configured items
- Cart data persists in browser's localStorage
- Orders are stored in MongoDB
- Estimated preparation time: 25-30 minutes
- Order IDs are auto-generated with prefix "ORD"

## Future Enhancements

- Payment gateway integration
- Admin panel for menu management
- Item customization options
- Order status tracking
- Rating and reviews
- Multiple address support
