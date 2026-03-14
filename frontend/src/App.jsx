import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find(c => c.id === item.id);
    if (existingItem) {
      setCart(cart.map(c =>
        c.id === item.id
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = (data) => {
    setOrderData(data);
    setCurrentPage('confirmation');
    clearCart();
  };

  return (
    <div className="App">
      {currentPage !== 'home' && currentPage !== 'login' && (
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-logo">🍔 FoodHub</h1>
            <div className="header-actions">
              <button 
                className="btn-home"
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
              {(currentPage === 'menu' || currentPage === 'checkout') && (
                <button 
                  className="btn-cart-header"
                  onClick={() => setCurrentPage('cart')}
                >
                  🛒 Cart ({cart.length})
                </button>
              )}
              <button 
                className="btn-home"
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('authToken');
                  setCurrentPage('login');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="app-main" style={{ paddingTop: currentPage === 'home' || currentPage === 'login' ? '0' : '2rem' }}>
        {currentPage === 'login' && (
          <Login onLoginSuccess={(user) => {
            console.log('User logged in:', user);
            setCurrentPage('home');
          }} />
        )}
        {currentPage === 'home' && (
          <Home onStartOrder={() => setCurrentPage('menu')} />
        )}
        {currentPage === 'menu' && (
          <Menu onAddToCart={addToCart} cartItemCount={cart.length} />
        )}
        {currentPage === 'cart' && (
          <Cart 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentPage('checkout')}
            onBackToMenu={() => setCurrentPage('menu')}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout 
            cart={cart}
            onConfirmOrder={handleCheckout}
            onBackToCart={() => setCurrentPage('cart')}
          />
        )}
        {currentPage === 'confirmation' && (
          <Confirmation 
            orderData={orderData}
            onNewOrder={() => {
              setCurrentPage('home');
              setOrderData(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
