// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiService = {
  postWithoutToken: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },
  // Add other methods as needed
};

export default apiService;
