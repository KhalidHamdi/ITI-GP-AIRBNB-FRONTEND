// src/axios.js
import axios from 'axios';

// Define the base URL of your backend API
const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual backend URL

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Use 'multipart/form-data' if needed
  },
});

// You can set up interceptors if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify config before request is sent (e.g., add auth token)
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
