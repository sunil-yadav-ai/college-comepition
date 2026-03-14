import React, { useState } from 'react';
import { orderAPI } from '../api';
import '../styles/Checkout.css';

function Checkout({ cart, onConfirmOrder, onBackToCart }) {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    orderType: 'Dine-in'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const tax = (totalAmount + deliveryFee) * 0.05;
  const finalTotal = totalAmount + deliveryFee + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderPayload = {
        customerName: formData.customerName,
        mobileNumber: formData.mobileNumber,
        orderType: formData.orderType,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        totalAmount: parseFloat(finalTotal.toFixed(2))
      };

      const response = await orderAPI.createOrder(orderPayload);
      
      onConfirmOrder({
        orderId: response.data.orderId,
        customerName: response.data.customerName,
        items: response.data.items,
        totalAmount: response.data.totalAmount,
        estimatedTime: response.data.estimatedTime,
        orderType: response.data.orderType
      });
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout</h2>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Delivery Details</h3>
            
            <div className="form-group">
              <label htmlFor="customerName">Full Name *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your 10-digit mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="orderType">Order Type *</label>
              <select
                id="orderType"
                name="orderType"
                value={formData.orderType}
                onChange={handleInputChange}
                required
              >
                <option value="Dine-in">Dine-in</option>
                <option value="Takeaway">Takeaway</option>
              </select>
            </div>
          </div>

          <div className="order-review-section">
            <h3>Order Review</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="review-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-calculations">
              <div className="calc-row">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span>Delivery Fee:</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="calc-row">
                <span>Tax (5%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="calc-row final-total">
                <span>Total Amount:</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="checkout-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onBackToCart}
              disabled={loading}
            >
              Back to Cart
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
