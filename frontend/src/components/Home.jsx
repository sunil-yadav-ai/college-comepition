import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';

function Home({ onStartOrder }) {
  const [activeNav, setActiveNav] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [brokenImages, setBrokenImages] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (imageId) => {
    setBrokenImages(prev => new Set(prev).add(imageId));
  };

  const getImageUrl = (imageId, originalUrl) => {
    if (brokenImages.has(imageId)) {
      return FALLBACK_IMAGE;
    }
    return originalUrl;
  };

  const handleNavClick = (section) => {
    setActiveNav(section);
    if (section === 'order') {
      onStartOrder();
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Premium Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-wrapper">
          <div className="navbar-brand">
            <span className="brand-logo">🍽️</span>
            <span className="brand-name">FoodHub</span>
          </div>
          <ul className="navbar-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#menu" onClick={(e) => { e.preventDefault(); handleNavClick('menu'); }} className={`nav-link ${activeNav === 'menu' ? 'active' : ''}`}>Menu</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`}>Contact</a></li>
            <li><button className="btn-nav-cta" onClick={() => handleNavClick('order')}>Order Now</button></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Taste Excellence<br/>Delivered to You</h1>
            <p className="hero-subtitle">Experience premium food from top restaurants. Fast delivery, fresh quality, best prices.</p>
            <button className="btn-hero" onClick={onStartOrder}>Start Ordering → </button>
          </div>
          <div className="hero-images-banner">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop" alt="Premium Burgers" className="hero-img--primary" />
            <img src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop" alt="Fresh Pizza" className="hero-img--secondary" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="features-section">
        <div className="section-header">
          <h2>Why Choose FoodHub?</h2>
          <p>The best food delivery experience in your city</p>
        </div>
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Super Fast</h3>
            <p>Get your food in 20-30 minutes</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🍽️</div>
            <h3>Premium Quality</h3>
            <p>Fresh ingredients every time</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Unbeatable deals & discounts</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3>100% Secure</h3>
            <p>Safe payments & data protection</p>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section id="menu" className="menu-preview-section">
        <div className="section-header">
          <h2>Our Popular Menu</h2>
          <p>Handpicked favorites from our best restaurants</p>
        </div>
        <div className="menu-preview-grid">
          <div className="menu-item-card">
            <div className="item-image">
              <img 
                src={getImageUrl('burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=350&h=280&fit=crop')} 
                alt="Premium Burger"
                onError={() => handleImageError('burger')}
                loading="lazy"
              />
              <div className="price-tag">₹149</div>
            </div>
            <div className="item-info">
              <h4>Signature Burger</h4>
              <p>Juicy beef with fresh toppings</p>
              <div className="item-meta">
                <span className="rating">⭐ 4.8</span>
                <span className="time">🕐 15 min</span>
              </div>
              <button className="btn-item" onClick={onStartOrder}>Add to Order</button>
            </div>
          </div>

          <div className="menu-item-card">
            <div className="item-image">
              <img 
                src={getImageUrl('pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=350&h=280&fit=crop')} 
                alt="Pepperoni Pizza"
                onError={() => handleImageError('pizza')}
                loading="lazy"
              />
              <div className="price-tag">₹299</div>
            </div>
            <div className="item-info">
              <h4>Pepperoni Pizza</h4>
              <p>Classic Italian with fresh mozzarella</p>
              <div className="item-meta">
                <span className="rating">⭐ 4.9</span>
                <span className="time">🕐 20 min</span>
              </div>
              <button className="btn-item" onClick={onStartOrder}>Add to Order</button>
            </div>
          </div>

          <div className="menu-item-card">
            <div className="item-image">
              <img 
                src={getImageUrl('chicken', 'https://images.unsplash.com/photo-1553909764-5ed0029cfde5?w=350&h=280&fit=crop')} 
                alt="Fried Chicken"
                onError={() => handleImageError('chicken')}
                loading="lazy"
              />
              <div className="price-tag">₹199</div>
            </div>
            <div className="item-info">
              <h4>Crispy Chicken</h4>
              <p>Golden fried with spicy sauce</p>
              <div className="item-meta">
                <span className="rating">⭐ 4.7</span>
                <span className="time">🕐 18 min</span>
              </div>
              <button className="btn-item" onClick={onStartOrder}>Add to Order</button>
            </div>
          </div>

          <div className="menu-item-card">
            <div className="item-image">
              <img 
                src={getImageUrl('cake', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=350&h=280&fit=crop')} 
                alt="Chocolate Cake"
                onError={() => handleImageError('cake')}
                loading="lazy"
              />
              <div className="price-tag">₹129</div>
            </div>
            <div className="item-info">
              <h4>Chocolate Delight</h4>
              <p>Rich chocolate cake with frosting</p>
              <div className="item-meta">
                <span className="rating">⭐ 4.6</span>
                <span className="time">🕐 10 min</span>
              </div>
              <button className="btn-item" onClick={onStartOrder}>Add to Order</button>
            </div>
          </div>

          <div className="menu-item-card">
            <div className="item-image">
              <img 
                src={getImageUrl('juice', 'https://images.unsplash.com/photo-1600271886742-f049cd1f04b8?w=350&h=280&fit=crop')} 
                alt="Orange Juice"
                onError={() => handleImageError('juice')}
                loading="lazy"
              />
              <div className="price-tag">₹79</div>
            </div>
            <div className="item-info">
              <h4>Fresh Orange Juice</h4>
              <p>Freshly squeezed premium juice</p>
              <div className="item-meta">
                <span className="rating">⭐ 4.5</span>
                <span className="time">🕐 5 min</span>
              </div>
              <button className="btn-item" onClick={onStartOrder}>Add to Order</button>
            </div>
          </div>

          <div className="menu-item-card">
            <div className="item-image">
              <img 
                src={getImageUrl('veggie', 'https://images.unsplash.com/photo-1511689915661-c6cab039cb97?w=350&h=280&fit=crop')} 
                alt="Veggie Pizza"
                onError={() => handleImageError('veggie')}
                loading="lazy"
              />
              <div className="price-tag">₹269</div>
            </div>
            <div className="item-info">
              <h4>Veggie Special</h4>
              <p>Fresh vegetables on thin crust</p>
              <div className="item-meta">
                <span className="rating">⭐ 4.4</span>
                <span className="time">🕐 20 min</span>
              </div>
              <button className="btn-item" onClick={onStartOrder}>Add to Order</button>
            </div>
          </div>
        </div>
        <div className="menu-preview-footer">
          <button className="btn-view-menu" onClick={onStartOrder}>View Full Menu →</button>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>Simple Steps to Delicious Food</h2>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Browse</h3>
            <p>Explore our wide variety of cuisines</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Select</h3>
            <p>Pick your favorite items</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Checkout</h3>
            <p>Quick and secure payment</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Enjoy</h3>
            <p>Fresh food at your door</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Excellent food quality and super fast delivery. Highly recommended!"</p>
            <h5>- Sarah Johnson</h5>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Best pizza I've ever had. The app is so easy to use!"</p>
            <h5>- Mike Chen</h5>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Amazing prices and fantastic variety. Worth every penny!"</p>
            <h5>- Emma Davis</h5>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to Satisfy Your Cravings?</h2>
        <p>Join thousands of happy customers enjoying premium food</p>
        <button className="btn-cta-large" onClick={onStartOrder}>Order Now</button>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>FoodHub</h4>
            <p>Your trusted food delivery partner for quick, fresh, and delicious meals.</p>
            <div className="social-links">
              <span>📱</span> <span>📧</span> <span>🌐</span>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📧 support@foodhub.com</p>
            <p>📞 +91 9876543210</p>
            <p>🕐 Available 24/7</p>
          </div>
          <div className="footer-section">
            <h4>Download App</h4>
            <button className="app-button">📱 App Store</button>
            <button className="app-button">🔵 Play Store</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FoodHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
