import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // All requests will be sent to our backend
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    // Check localStorage first, then fall back to sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
