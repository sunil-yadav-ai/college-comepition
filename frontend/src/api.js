import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password, confirmPassword) => api.post('/auth/signup', { name, email, password, confirmPassword }),
  logout: () => api.post('/auth/logout'),
  verifyToken: (token) => api.post('/auth/verify', { token })
};

export const menuAPI = {
  getAll: () => api.get('/menu'),
  getByCategory: (category) => api.get(`/menu/category/${category}`),
  initMenu: () => api.post('/menu/init')
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (orderId) => api.get(`/orders/${orderId}`)
};

export default api;
