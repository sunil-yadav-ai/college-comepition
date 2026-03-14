const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Helper to validate email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Helper to validate password strength
const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Generate simple JWT token (for demo - use jsonwebtoken in production)
const generateToken = (userId) => {
  return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
};

/**
 * POST /api/auth/init
 * Initialize demo user (for testing)
 */
router.post('/init', async (req, res) => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@foodhub.com' });
    
    if (existingUser) {
      return res.json({
        success: true,
        message: 'Demo user already exists'
      });
    }

    // Create demo user
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@foodhub.com',
      password: 'password123',
      phone: '9876543210',
      address: '123 Food Street, Foodville'
    });

    await demoUser.save();

    res.status(201).json({
      success: true,
      message: 'Demo user created successfully',
      user: {
        id: demoUser._id,
        email: demoUser.email,
        name: demoUser.name
      }
    });

  } catch (error) {
    console.error('Init demo user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize demo user'
    });
  }
});

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name is required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already registered. Please login.' 
      });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password, // In production, hash this with bcrypt
      lastLogin: new Date()
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Signup failed. Please try again.' 
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and return token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check password (in production, use bcrypt.compare)
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    });
  }
});

/**
 * POST /api/auth/verify
 * Verify if token is valid
 */
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is required' 
      });
    }

    // Decode token (simple base64 decode for demo)
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [userId] = decoded.split(':');
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token' 
        });
      }

      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Token verification failed' 
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (for frontend to handle, backend just confirms)
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
