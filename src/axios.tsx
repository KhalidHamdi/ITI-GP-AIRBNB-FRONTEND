// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', 
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, 
});

export default axiosInstance;
// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8000',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
// });

// axiosInstance.interceptors.request.use(config => {
//   const token = localStorage.getItem('accessToken');  // Get accessToken from localStorage
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// export default axiosInstance;

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     if (error.response.status === 401 && !originalRequest._retry) { 
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem('refreshToken');  
      
//       if (refreshToken) {
//         try {
//           const response = await axios.post('http://localhost:8000/api/auth/refresh-token/', { refreshToken });
//           const { accessToken } = response.data;
          
//           localStorage.setItem('accessToken', accessToken);  

//           axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//           originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//           return axiosInstance(originalRequest);
//         } catch (err) {
//           console.error("Failed to refresh token", err);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

