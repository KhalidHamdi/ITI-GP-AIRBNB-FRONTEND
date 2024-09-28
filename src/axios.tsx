// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', 
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

export default axiosInstance;
