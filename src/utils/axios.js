// userAxiosInstance.js
import axios from 'axios';

/**
 * Custom Axios instance with default configuration
 * This can be imported and used throughout your application
 */
const userAxiosInstance = axios.create({
  // Base URL for all requests
  baseURL: 'http://localhost:4000/api/auth',
  
  // Request timeout in milliseconds (5 seconds)
  timeout: 5000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
userAxiosInstance.interceptors.request.use(
  config => {
    // You can modify request config here before sending
    // For example, add an auth token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
userAxiosInstance.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx
    return response;
  },
  error => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error('Response error:', error.response.status);
      
      // Handle token expiration
      if (error.response.status === 401) {
        // Redirect to login or refresh token
        console.log('Unauthorized - redirecting to login');
        // Add your token refresh logic here
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default userAxiosInstance;