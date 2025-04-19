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
  timeout: 15000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
userAxiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
userAxiosInstance.interceptors.response.use(
  response => {
   
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
        localStorage.removeItem("userToken")
        window.location.href = '/login';
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