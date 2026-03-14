import React from 'react';
import '../styles/Cart.css';

function Cart({ cart, onUpdateQuantity, onRemoveItem, onCheckout, onBackToMenu }) {
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to get started!</p>
          <button className="btn-primary" onClick={onBackToMenu}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Order Summary</h2>
      
      <div className="cart-items-container">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className="item-price">₹{item.price}</p>
            </div>
            <div className="quantity-control">
              <button 
                className="qty-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="item-total">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              className="btn-remove"
              onClick={() => onRemoveItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>₹50</span>
        </div>
        <div className="summary-row">
          <span>Tax (5%):</span>
          <span>₹{((totalAmount + 50) * 0.05).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>₹{(totalAmount + 50 + ((totalAmount + 50) * 0.05)).toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="btn-secondary" onClick={onBackToMenu}>
          Continue Shopping
        </button>
        <button className="btn-primary" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
