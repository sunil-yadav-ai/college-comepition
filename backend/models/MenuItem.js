const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  deliveryTime: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
