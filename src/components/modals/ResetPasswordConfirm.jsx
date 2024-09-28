// src/components/auth/ResetPasswordConfirm.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import CustomButton from '../forms/CustomButton';
import './ResetPasswordConfirm.css'; // Create and style this CSS file

const ResetPasswordConfirm = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const submitReset = async (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            setErrors(['Passwords do not match.']);
            return;
        }

        const data = {
            uid: uid,
            token: token,
            new_password1: password1,
            new_password2: password2,
        };

        try {
            const response = await axiosInstance.post('/api/auth/password/reset/confirm/', data);
            setMessage('Your password has been reset successfully.');
            setErrors([]);
            // Redirect to login after a delay
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            // Extract error messages from the response
            const errorMessages = [];
            if (error.response && error.response.data) {
                for (const key in error.response.data) {
                    if (Array.isArray(error.response.data[key])) {
                        error.response.data[key].forEach(msg => errorMessages.push(msg));
                    } else {
                        errorMessages.push(error.response.data[key]);
                    }
                }
            } else {
                errorMessages.push('Error resetting password. Please try again.');
            }
            setErrors(errorMessages);
            setMessage('');
            console.error("Error resetting password:", error);
        }
    };

    return (
        <div className="reset-password-confirm-container">
            <h2>Reset Your Password</h2>

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {errors.length > 0 && (
                <div className="alert alert-danger">
                    {errors.map((error, index) => (
                        <div key={`error_${index}`}>{error}</div>
                    ))}
                </div>
            )}

            <form onSubmit={submitReset}>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password1"
                        placeholder="Enter new password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        placeholder="Confirm new password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>

                <CustomButton label="Reset Password" type="submit" />
            </form>
        </div>
    );
};

export default ResetPasswordConfirm;
