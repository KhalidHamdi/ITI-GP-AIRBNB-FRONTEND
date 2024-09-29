// src/components/modals/PasswordResetModal.jsx

import React, { useState } from 'react';
import Modal from './Modal'; // Adjust the path if necessary
import axiosInstance from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { closePasswordResetModal } from '../../redux/modalSlice'; 

const PasswordResetModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.passwordResetModalOpen);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const close = () => {
        dispatch(closePasswordResetModal());
    };

    const submitResetPassword = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post('/api/auth/password/reset/', { email });
            setMessage('Check your email for a password reset link.');
            setErrors([]);
        } catch (error) {
            setErrors(error.response?.data?.email || ['Error sending reset email. Please try again.']);
            setMessage('');
            console.error("Error sending reset email:", error);
        }
    };

    const content = (
        <form onSubmit={submitResetPassword}>
            <div className="mb-3">
                <label htmlFor="resetEmail" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="resetEmail"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {message && (
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            )}

            {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}

            <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
    );

    return <Modal isOpen={isOpen} close={close} label="Reset Password" content={content} />;
};

export default PasswordResetModal;
