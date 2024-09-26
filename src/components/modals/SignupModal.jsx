// src/components/modals/SignupModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeSignupModal } from '../../redux/modalSlice';
import CustomButton from '../forms/CustomButton';
import { handleLogin } from '../../lib/actions';
import axiosInstance from '../../axios'; // Adjust the path based on your project structure


const SignupModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.signupModalOpen);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState([]); // Add this line


  const close = () => {
    dispatch(closeSignupModal());
  };

  const submitSignup = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password1,
      password2,
    };

    const response = await axiosInstance.post('/api/auth/register/', formData);

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      close();
      navigate('/');
    } else {
      const tmpErrors = Object.values(response).flat();
      setErrors(tmpErrors);
    }
  };

  const content = (
    <form onSubmit={submitSignup}>
      <div className="mb-3">
        <label htmlFor="signupEmail" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="signupEmail"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="signupPassword1" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="signupPassword1"
          placeholder="Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="signupPassword2" className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="signupPassword2"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
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
    </form>
  );

  return <Modal isOpen={isOpen} close={close} label="Sign up" content={content} />;

};

export default SignupModal;
