import React from 'react';
import '../styles/Confirmation.css';

function Confirmation({ orderData, onNewOrder }) {
  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p className="success-message">Your order has been placed successfully</p>

        <div className="order-confirmation-card">
          <div className="order-number">
            <span className="label">Order Number</span>
            <span className="value">{orderData.orderId}</span>
          </div>

          <div className="order-info">
            <div className="info-row">
              <span className="label">Customer Name:</span>
              <span className="value">{orderData.customerName}</span>
            </div>
            <div className="info-row">
              <span className="label">Order Type:</span>
              <span className="value">{orderData.orderType}</span>
            </div>
            <div className="info-row">
              <span className="label">Estimated Time:</span>
              <span className="value">🕐 {orderData.estimatedTime}</span>
            </div>
          </div>

          <div className="ordered-items">
            <h3>Ordered Items</h3>
            {orderData.items.map((item, index) => (
              <div key={index} className="item-row">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.total}</span>
              </div>
            ))}
          </div>

          <div className="final-bill">
            <h3>Final Bill</h3>
            <div className="bill-amount">
              <span>Total Amount:</span>
              <span className="amount">₹{orderData.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-status">
            <div className="status-item">
              <div className="status-circle completed">✓</div>
              <div className="status-text">
                <p className="status-title">Order Confirmed</p>
                <p className="status-desc">Your order is confirmed</p>
              </div>
            </div>
            <div className="status-separator"></div>
            <div className="status-item">
              <div className="status-circle active">🔄</div>
              <div className="status-text">
                <p className="status-title">Preparing</p>
                <p className="status-desc">Your food is being prepared</p>
              </div>
            </div>
            <div className="status-separator"></div>
            <div className="status-item">
              <div className="status-circle">🚚</div>
              <div className="status-text">
                <p className="status-title">Out for Delivery</p>
                <p className="status-desc">Coming your way</p>
              </div>
            </div>
          </div>
        </div>

        <button className="btn-new-order" onClick={onNewOrder}>
          Place New Order
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
