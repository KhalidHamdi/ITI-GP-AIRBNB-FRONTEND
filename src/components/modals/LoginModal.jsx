// src/components/modals/LoginModal.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginModal, openPasswordResetModal } from '../../redux/modalSlice';
import CustomButton from '../forms/CustomButton';
import { handleLogin } from '../../lib/actions';
import axiosInstance from '../../axios';
import PasswordResetModal from './PasswordResetModal';
import PasswordInput from '../forms/PasswordInput';
import { toast } from 'react-toastify'; // Import toast

const LoginModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.loginModalOpen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const close = () => {
    dispatch(closeLoginModal());
  };

  const submitLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email,
      password,
    };
  
    try {
      const response = await axiosInstance.post('/api/auth/login/', loginData);
      console.log(response.data); 
  
      if (response.data.key && response.data.user_id && response.data.user) {
        const { key, refreshToken, user_id, user } = response.data;
        handleLogin(key, refreshToken, user_id, user.username); 
        close();
        // Display success toast
        toast.success("Login successful!", {
          onClose: () => navigate('/'),
        });
        console.log("Login successful");
      } else {
        setErrors(['Login failed. Token or User ID not found in response.']);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      if (error.response?.data?.non_field_errors) {
        setErrors(error.response.data.non_field_errors);
      } else if (error.response?.data) {
        const fieldErrors = Object.entries(error.response.data)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`);
        setErrors(fieldErrors);
      } else {
        setErrors(['Login failed. Please check your credentials and try again.']);
      }
    }
  };
  
  const openResetModal = () => {
    dispatch(openPasswordResetModal());
  };

  const content = (
    <form onSubmit={submitLogin}>
      <div className="mb-3">
        <label htmlFor="loginEmail" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="loginEmail"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <PasswordInput
        id="loginPassword"
        label="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.map((error, index) => (
            <div key={`error_${index}`}>{error}</div>
          ))}
        </div>
      )}

      <CustomButton label="Submit" type="submit" />

      <div className="mt-3">
        <button type="button" className="btn btn-link" onClick={openResetModal}>
          Forgot Password?
        </button>
      </div>
    </form>
  );

  return (
    <>
      <Modal isOpen={isOpen} close={close} label="Log in" content={content} />
      <PasswordResetModal /> 
    </>
  );
};

export default LoginModal;
