import React, { useState, useEffect } from 'react';
import { menuAPI } from '../api';
import '../styles/Menu.css';

// Fallback image for when images fail to load
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';

function Menu({ onAddToCart, cartItemCount }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Burgers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [brokenImages, setBrokenImages] = useState(new Set());

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAll();
      
      if (response.data.length === 0) {
        // Initialize menu if empty
        await menuAPI.initMenu();
        const initResponse = await menuAPI.getAll();
        setMenuItems(initResponse.data);
      } else {
        setMenuItems(response.data);
      }

      // Get unique categories
      const uniqueCategories = ['Burgers', 'Pizza', 'Chicken', 'Beverages', 'Desserts', 'Combo Meals'];
      setCategories(uniqueCategories);
      setError(null);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (itemId) => {
    setBrokenImages(prev => new Set(prev).add(itemId));
  };

  const getImageUrl = (item) => {
    if (brokenImages.has(item.id)) {
      return FALLBACK_IMAGE;
    }
    return item.image || FALLBACK_IMAGE;
  };

  const filteredItems = menuItems.filter(item => 
    item.category === selectedCategory && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).map((item, index) => ({ ...item, uniqueKey: `${item.id}-${index}` }));

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2>Our Menu</h2>
        <input 
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading menu...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.uniqueKey} className="menu-item-card">
              <div className="item-image-container">
                <img 
                  src={getImageUrl(item)} 
                  alt={item.name} 
                  className="item-image"
                  onError={() => {
                    console.warn(`Image failed to load for ${item.name}: ${item.image}`);
                    handleImageError(item.id);
                  }}
                  loading="lazy"
                />
                <div className="price-badge">₹{item.price}</div>
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="item-meta">
                  <span className="rating">⭐ {item.rating}</span>
                  <span className="delivery-time">🕐 {item.deliveryTime}</span>
                </div>
                <button 
                  className="btn-add-to-cart"
                  onClick={() => onAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
