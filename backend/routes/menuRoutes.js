const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize menu items with professional food photography
router.post('/init', async (req, res) => {
  try {
    // Clear existing items
    await MenuItem.deleteMany({});

    const menuItems = [
      // Burgers - Premium Food Photography
      { 
        id: 'burger-1', 
        name: 'Premium Beef Burger', 
        category: 'Burgers', 
        price: 149, 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop', 
        description: 'Juicy beef patty with fresh lettuce, tomato, pickles and special mayo', 
        rating: 4.8, 
        deliveryTime: '15 mins' 
      },
      { 
        id: 'burger-2', 
        name: 'Classic Bacon Burger', 
        category: 'Burgers', 
        price: 199, 
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=500&fit=crop', 
        description: 'Crispy bacon, cheddar cheese, and caramelized onions on toasted bun', 
        rating: 4.9, 
        deliveryTime: '18 mins' 
      },
      { 
        id: 'burger-3', 
        name: 'Grilled Chicken Burger', 
        category: 'Burgers', 
        price: 159, 
        image: 'https://images.unsplash.com/photo-1562547256-e4b92b6e6e88?w=500&h=500&fit=crop', 
        description: 'Tender grilled chicken breast with Swiss cheese and herb mayo', 
        rating: 4.7, 
        deliveryTime: '16 mins' 
      },
      { 
        id: 'burger-4', 
        name: 'Double Patty Special', 
        category: 'Burgers', 
        price: 229, 
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop', 
        description: 'Two beef patties with double cheese, bacon, and spicy aioli', 
        rating: 4.9, 
        deliveryTime: '20 mins' 
      },
      { 
        id: 'burger-5', 
        name: 'Mushroom Swiss Burger', 
        category: 'Burgers', 
        price: 179, 
        image: 'https://images.unsplash.com/photo-1585238341710-4913d3a3a48f?w=500&h=500&fit=crop', 
        description: 'Sautéed mushrooms with melted Swiss cheese and garlic butter', 
        rating: 4.6, 
        deliveryTime: '17 mins' 
      },

      // Pizza - Premium Collection
      { 
        id: 'pizza-1', 
        name: 'Margherita Perfetto', 
        category: 'Pizza', 
        price: 249, 
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=500&fit=crop', 
        description: 'Fresh mozzarella, basil, tomato sauce on thin crust - Italian style', 
        rating: 4.8, 
        deliveryTime: '20 mins' 
      },
      { 
        id: 'pizza-2', 
        name: 'Pepperoni Lovers', 
        category: 'Pizza', 
        price: 299, 
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=500&h=500&fit=crop', 
        description: 'Loaded with premium pepperoni and mozzarella cheese', 
        rating: 4.9, 
        deliveryTime: '22 mins' 
      },
      { 
        id: 'pizza-3', 
        name: 'Garden Veggie Special', 
        category: 'Pizza', 
        price: 269, 
        image: 'https://images.unsplash.com/photo-1511689915661-c6cab039cb97?w=500&h=500&fit=crop', 
        description: 'Fresh bell peppers, onions, mushrooms, olives, tomato and spinach', 
        rating: 4.7, 
        deliveryTime: '21 mins' 
      },
      { 
        id: 'pizza-4', 
        name: 'BBQ Chicken Supreme', 
        category: 'Pizza', 
        price: 329, 
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=500&fit=crop', 
        description: 'Grilled chicken, BBQ sauce, red onion, cilantro, and cheese blend', 
        rating: 4.9, 
        deliveryTime: '25 mins' 
      },
      { 
        id: 'pizza-5', 
        name: 'Four Cheese Delight', 
        category: 'Pizza', 
        price: 289, 
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop', 
        description: 'Mozzarella, feta, parmesan, and ricotta on perfect crust', 
        rating: 4.8, 
        deliveryTime: '23 mins' 
      },

      // Chicken - New Category
      { 
        id: 'chicken-1', 
        name: 'Crispy Fried Chicken', 
        category: 'Chicken', 
        price: 199, 
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cfd330?w=500&h=500&fit=crop', 
        description: 'Golden fried chicken pieces with secret spice blend', 
        rating: 4.8, 
        deliveryTime: '18 mins' 
      },
      { 
        id: 'chicken-2', 
        name: 'Honey Garlic Wings', 
        category: 'Chicken', 
        price: 179, 
        image: 'https://images.unsplash.com/photo-1567050351726-f481b22e6e7b?w=500&h=500&fit=crop', 
        description: 'Crispy wings glazed with honey and garlic sauce', 
        rating: 4.7, 
        deliveryTime: '15 mins' 
      },
      { 
        id: 'chicken-3', 
        name: 'Tandoori Chicken', 
        category: 'Chicken', 
        price: 219, 
        image: 'https://images.unsplash.com/photo-1599599810694-18c1a54d9d35?w=500&h=500&fit=crop', 
        description: 'Authentic Indian tandoori chicken with lemon and spices', 
        rating: 4.9, 
        deliveryTime: '20 mins' 
      },

      // Beverages - Premium Selection
      { 
        id: 'beverage-1', 
        name: 'Fresh Orange Juice', 
        category: 'Beverages', 
        price: 79, 
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd1f04b8?w=500&h=500&fit=crop', 
        description: 'Freshly squeezed orange juice, no added sugar', 
        rating: 4.8, 
        deliveryTime: '5 mins' 
      },
      { 
        id: 'beverage-2', 
        name: 'Mango Lassi', 
        category: 'Beverages', 
        price: 89, 
        image: 'https://images.unsplash.com/photo-1590080876614-8ec8d7e6b1b9?w=500&h=500&fit=crop', 
        description: 'Thick yogurt-based mango drink with cardamom', 
        rating: 4.9, 
        deliveryTime: '8 mins' 
      },
      { 
        id: 'beverage-3', 
        name: 'Iced Virgin Mojito', 
        category: 'Beverages', 
        price: 99, 
        image: 'https://images.unsplash.com/photo-1544433604-c70fbe873993?w=500&h=500&fit=crop', 
        description: 'Refreshing mint, lime, and soda water with fresh ice', 
        rating: 4.7, 
        deliveryTime: '10 mins' 
      },
      { 
        id: 'beverage-4', 
        name: 'Cold Brew Coffee', 
        category: 'Beverages', 
        price: 69, 
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop', 
        description: 'Smooth cold brew with milk and ice', 
        rating: 4.6, 
        deliveryTime: '5 mins' 
      },
      { 
        id: 'beverage-5', 
        name: 'Strawberry Smoothie', 
        category: 'Beverages', 
        price: 99, 
        image: 'https://images.unsplash.com/photo-1590927961164-fa1f7f6b28f0?w=500&h=500&fit=crop', 
        description: 'Creamy strawberry yogurt smoothie with honey', 
        rating: 4.8, 
        deliveryTime: '10 mins' 
      },

      // Desserts - Premium Selection
      { 
        id: 'dessert-1', 
        name: 'Chocolate Lava Cake', 
        category: 'Desserts', 
        price: 139, 
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop', 
        description: 'Warm chocolate cake with flowing molten center', 
        rating: 4.9, 
        deliveryTime: '12 mins' 
      },
      { 
        id: 'dessert-2', 
        name: 'Premium Vanilla Ice Cream', 
        category: 'Desserts', 
        price: 99, 
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e0f0?w=500&h=500&fit=crop', 
        description: 'Creamy vanilla ice cream made with real vanilla beans', 
        rating: 4.7, 
        deliveryTime: '5 mins' 
      },
      { 
        id: 'dessert-3', 
        name: 'Fudgy Brownie', 
        category: 'Desserts', 
        price: 109, 
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=500&fit=crop', 
        description: 'Dark chocolate brownie with walnuts and gooey center', 
        rating: 4.8, 
        deliveryTime: '10 mins' 
      },
      { 
        id: 'dessert-4', 
        name: 'Creamy Cheesecake', 
        category: 'Desserts', 
        price: 159, 
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=500&fit=crop', 
        description: 'New York style cheesecake with strawberry compote', 
        rating: 4.9, 
        deliveryTime: '15 mins' 
      },
      { 
        id: 'dessert-5', 
        name: 'Mango Cheesecake', 
        category: 'Desserts', 
        price: 149, 
        image: 'https://images.unsplash.com/photo-1594007759138-94d30b43d891?w=500&h=500&fit=crop', 
        description: 'Tropical mango flavored cheesecake with graham crust', 
        rating: 4.8, 
        deliveryTime: '15 mins' 
      },

      // Combo Meals - Value Packs
      { 
        id: 'combo-1', 
        name: 'Burger & Drink Combo', 
        category: 'Combo Meals', 
        price: 199, 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop', 
        description: 'Any burger + cold drink of choice', 
        rating: 4.8, 
        deliveryTime: '20 mins' 
      },
      { 
        id: 'combo-2', 
        name: 'Pizza Delight Pack', 
        category: 'Combo Meals', 
        price: 399, 
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=500&h=500&fit=crop', 
        description: 'Medium pizza + dessert + beverage', 
        rating: 4.7, 
        deliveryTime: '25 mins' 
      },
      { 
        id: 'combo-3', 
        name: 'Family Feast', 
        category: 'Combo Meals', 
        price: 749, 
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop', 
        description: '2 burgers + 1 pizza + 2 drinks + 1 dessert', 
        rating: 4.8, 
        deliveryTime: '30 mins' 
      },
      { 
        id: 'combo-4', 
        name: 'Party Celebration Pack', 
        category: 'Combo Meals', 
        price: 1099, 
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561601?w=400&h=400&fit=crop', 
        description: '4 burgers + 2 pizzas + 4 drinks + 2 desserts', 
        rating: 4.9, 
        deliveryTime: '35 mins' 
      }
    ];

    await MenuItem.insertMany(menuItems);
    res.json({ message: 'Menu items initialized successfully', count: menuItems.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
