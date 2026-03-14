const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  mobileNumber: String,
  orderType: String,
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],
  totalAmount: Number,
  estimatedTime: String,
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
