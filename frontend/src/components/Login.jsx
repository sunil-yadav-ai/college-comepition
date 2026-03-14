import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Clear server error when user starts typing
  useEffect(() => {
    if (serverError) {
      setServerError('');
    }
  }, [formData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (isSignUp) {
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      // Confirm password validation
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignUp 
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
          }
        : {
            email: formData.email,
            password: formData.password
          };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        // Store auth data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log(`${isSignUp ? 'Signup' : 'Login'} successful:`, data.user);

        if (isSignUp) {
          setSuccessMessage('Account created successfully! Redirecting...');
          setTimeout(() => {
            if (onLoginSuccess) {
              onLoginSuccess(data.user);
            }
          }, 1500);
        } else {
          if (onLoginSuccess) {
            onLoginSuccess(data.user);
          }
        }
      } else {
        setServerError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setServerError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Switch between login and signup
  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setServerError('');
    setSuccessMessage('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1>🍔 FoodHub</h1>
          <p>{isSignUp ? 'Create your account' : 'Sign in to your account'}</p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="error-alert" role="alert">
            ⚠️ {serverError}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="success-alert" role="alert">
            ✓ {successMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Name Input - SignUp Only */}
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                disabled={isLoading}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <span className="error-message" role="alert">{errors.name}</span>
              )}
            </div>
          )}

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              disabled={isLoading}
              aria-invalid={errors.email ? 'true' : 'false'}
              autoComplete="email"
            />
            {errors.email && (
              <span className="error-message" role="alert">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                disabled={isLoading}
                aria-invalid={errors.password ? 'true' : 'false'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <span className="error-message" role="alert">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password - SignUp Only */}
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  disabled={isLoading}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={isLoading}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message" role="alert">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {/* Remember Me - Login Only */}
          {!isSignUp && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" name="rememberMe" disabled={isLoading} />
                <span>Remember me</span>
              </label>
              <a href="#forgot-password" className="forgot-password-link" tabIndex={isLoading ? -1 : 0}>
                Forgot Password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading 
              ? (isSignUp ? 'Creating Account...' : 'Signing in...') 
              : (isSignUp ? 'Create Account' : 'Sign In')
            }
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="mode-toggle">
          <p>
            {isSignUp 
              ? 'Already have an account? '
              : "Don't have an account? "
            }
            <button 
              className="toggle-link"
              onClick={handleToggleMode}
              disabled={isLoading}
              type="button"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Demo Info */}
        {!isSignUp && (
          <div className="demo-info">
            <p>📧 Demo Email: <strong>demo@foodhub.com</strong></p>
            <p>🔐 Demo Password: <strong>password123</strong></p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>&copy; 2026 FoodHub. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
