// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import authReducer from './authSlice';


const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,

  },
});

export default store;
