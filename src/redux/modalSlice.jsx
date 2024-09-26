// src/redux/modalSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addPropertyModalOpen: false,
    loginModalOpen: false,
    signupModalOpen: false,
  },
  reducers: {
    // AddProperty modal actions
    openAddPropertyModal: (state) => {
      state.addPropertyModalOpen = true;
    },
    closeAddPropertyModal: (state) => {
      state.addPropertyModalOpen = false;
    },
    // Login modal actions
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    // Signup modal actions
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
  },
});

export const {
  openAddPropertyModal,
  closeAddPropertyModal,
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
} = modalSlice.actions;
export default modalSlice.reducer;
