const express = require('express');
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customerName, mobileNumber, orderType, items, totalAmount } = req.body;
    
    const orderId = `ORD${uuidv4().substring(0, 8).toUpperCase()}`;
    const estimatedTime = '25-30 mins';

    const order = new Order({
      orderId,
      customerName,
      mobileNumber,
      orderType,
      items,
      totalAmount,
      estimatedTime
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
