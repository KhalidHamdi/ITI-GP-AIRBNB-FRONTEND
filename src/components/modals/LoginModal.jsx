import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeLoginModal , openPasswordResetModal } from '../../redux/modalSlice';
import CustomButton from '../forms/CustomButton';
import { handleLogin } from '../../lib/actions';
import axiosInstance from '../../axios';
import PasswordResetModal from './PasswordResetModal'; // Import the new modal

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
      email, // Use 'username' instead of 'email' as per your backend
      password,
    };

    try {
      const response = await axiosInstance.post('/api/auth/login/', loginData);
      
      if (response.data.key) {
        handleLogin(response.data.key);
        close();
        navigate('/');
        window.location.reload();
        console.log("Login successful");
      } else {
        setErrors(['Login failed. Please try again.']);
      }
    } catch (error) {
      setErrors(error.response?.data?.non_field_errors || ['Login failed. Please try again.']);
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

      <div className="mb-3">
        <label htmlFor="loginPassword" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="loginPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

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

  // return <Modal isOpen={isOpen} close={close} label="Log in" content={content} />;
  return (
    <>
        <Modal isOpen={isOpen} close={close} label="Log in" content={content} />
        <PasswordResetModal /> {/* Ensure this component is rendered */}
    </>
  );

};

export default LoginModal;


