// src/components/auth/ResetPasswordConfirm.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { useForm } from 'react-hook-form';
import CustomButton from '../forms/CustomButton';
import PasswordInput from '../forms/PasswordInput';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../redux/modalSlice';
import './ResetPasswordConfirm.css';

const ResetPasswordConfirm = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const onSubmit = async (data) => {
        if (password1 !== password2) {
            setErrors(['Passwords do not match.']);
            return;
        }

        const payload = {
            uid: uid,
            token: token,
            new_password1: password1,
            new_password2: password2,
        };

        try {
            const response = await axiosInstance.post('/api/auth/password/reset/confirm/', payload);
            setMessage('Your password has been reset successfully.');
            setErrors([]);
            // Show success toast and navigate to home, then open login modal
            toast.success("Password reset successful! Please log in with your new password.", {
                onClose: () => {
                    navigate('/');
                    dispatch(openLoginModal());
                },
            });
        } catch (error) {
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    id="password1"
                    label="New Password"
                    placeholder="Enter new password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />

                <PasswordInput
                    id="password2"
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />

                <CustomButton label="Reset Password" type="submit" />
            </form>
        </div>
    );
};

export default ResetPasswordConfirm;
