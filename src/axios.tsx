// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', 
    // withCredentials: true, // Set to true if your backend requires credentials like cookies
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, 
});

export default axiosInstance;
