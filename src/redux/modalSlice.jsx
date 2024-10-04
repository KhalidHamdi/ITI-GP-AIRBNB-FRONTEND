// src/redux/modalSlice.jsx

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    addPropertyModalOpen: false,
    editPropertyModalOpen: false,      // New state for Edit Modal
    propertyToEdit: null,              // Holds the property data to edit
    loginModalOpen: false,
    signupModalOpen: false,
    filterModalOpen: false,
    passwordResetModalOpen: false,
    addAdsModalOpen: false,
    addAdsModalProperty: null, // To store the property

  },
  reducers: {
    // Add Property modal actions
    openAddPropertyModal: (state) => {
      state.addPropertyModalOpen = true;
    },
    closeAddPropertyModal: (state) => {
      state.addPropertyModalOpen = false;
    },
    
    // **Edit Property modal actions**
    openEditPropertyModal: (state, action) => {
      state.editPropertyModalOpen = true;
      state.propertyToEdit = action.payload; // Store the property to edit
    },
    closeEditPropertyModal: (state) => {
      state.editPropertyModalOpen = false;
      state.propertyToEdit = null;
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
    
    // Filter modal actions
    openFilterModal: (state) => {
      state.filterModalOpen = true;
    },
    closeFilterModal: (state) => {
      state.filterModalOpen = false;
    },
    
    // Password Reset modal actions
    openPasswordResetModal: (state) => {
      state.passwordResetModalOpen = true;
    },
    closePasswordResetModal: (state) => {
      state.passwordResetModalOpen = false;
    },
    openAddAdsModal: (state, action) => {
      state.addAdsModalOpen = true;
      state.addAdsModalProperty = action.payload; // Store the property here
    },
    closeAddAdsModal: (state) => {
      state.addAdsModalOpen = false;
      state.addAdsModalProperty = null;
    },
  },
});

export const {
  openAddPropertyModal,
  closeAddPropertyModal,
  openEditPropertyModal,          // Export the action
  closeEditPropertyModal,         // Export the action
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
  openFilterModal,
  closeFilterModal,
  openPasswordResetModal,
  closePasswordResetModal,
  openAddAdsModal,
  closeAddAdsModal,
} = modalSlice.actions;

export default modalSlice.reducer;
