// src/components/userprofile/UserProfile.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'; 
import Cookies from 'js-cookie';
import { FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import './UserProfile.css'; // Custom CSS for additional styling

const CustomAlert = ({ message, type }) => (
  <div className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'} mt-4`} role="alert">
    {message}
  </div>
);

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        first_name: '', 
        last_name: '', 
        bio: '', 
        address: '', 
        phone_number: '', 
        avatar: null 
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const authToken = Cookies.get('authToken');
            if (!authToken) {
                setError('No auth token found. Please log in.');
                return;
            }

            const response = await axiosInstance.get('/api/auth/profile/', {
                headers: { 'Authorization': `Token ${authToken}` }
            });
            setUser(response.data);
            setFormData({
                username: response.data.username || '',
                email: response.data.email || '',
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
                bio: response.data.bio || '',
                address: response.data.address || '',
                phone_number: response.data.phone_number || '',
                avatar: null, // Avatar will be handled separately
            });
        } catch (err) {
            setError('Failed to fetch user profile. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        // Basic client-side validation
        if (!formData.username.trim()) {
            setError('Username cannot be empty.');
            return;
        }
        if (formData.username.length > 20) {
            setError('Username cannot exceed 20 characters.');
            return;
        }
        if (!formData.email.trim()) {
            setError('Email cannot be empty.');
            return;
        }
        // Add more validations as needed

        const form = new FormData();
        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('first_name', formData.first_name);
        form.append('last_name', formData.last_name);
        form.append('bio', formData.bio);
        form.append('address', formData.address);
        form.append('phone_number', formData.phone_number);
        if (formData.avatar) {
            form.append('avatar', formData.avatar);
        }
        
        try {
            const authToken = Cookies.get('authToken');
            if (!authToken) {
                setError('No auth token found. Please log in.');
                return;
            }

            const response = await axiosInstance.put('/api/auth/profile/', form, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`
                }
            });
            
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
            fetchUserProfile(); 
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessages = [];
                for (const key in err.response.data) {
                    if (Array.isArray(err.response.data[key])) {
                        err.response.data[key].forEach(msg => errorMessages.push(msg));
                    } else {
                        errorMessages.push(err.response.data[key]);
                    }
                }
                setError(errorMessages.join(' '));
            } else {
                setError('Failed to update profile. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5 p-4 bg-white rounded shadow-sm">
            <h2 className="mb-4 text-center">User Profile</h2>
            
            {error && <CustomAlert message={error} type="error" />}
            {success && <CustomAlert message={success} type="success" />}
            
            <div className="row">
                <div className="col-md-4 text-center">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="rounded-circle img-fluid mb-3"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="avatar-placeholder mb-3">
                            <FaUser size={100} className="text-muted" />
                        </div>
                    )}
                    {isEditing && (
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label"><FaUser /> Change Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleFileChange}
                                className="form-control"
                                accept="image/*"
                            />
                        </div>
                    )}
                </div>
                <div className="col-md-8">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="username" className="form-label"><FaUser /> Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                        maxLength={20}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label"><FaEnvelope /> Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="first_name" className="form-label"><FaUser /> First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="last_name" className="form-label"><FaUser /> Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="bio" className="form-label"><FaInfoCircle /> Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="3"
                                    placeholder="Tell us about yourself..."
                                ></textarea>
                            </div>
                            
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="address" className="form-label"><FaMapMarkerAlt /> Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="123 Main St, City, Country"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="phone_number" className="form-label"><FaPhone /> Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="+1234567890"
                                    />
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-end">
                                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary me-2">
                                    <FaTimes /> Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-3">
                                <h5><FaUser /> Username:</h5>
                                <p>{user?.username || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5><FaEnvelope /> Email:</h5>
                                <p>{user?.email || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5><FaUser /> First Name:</h5>
                                <p>{user?.first_name || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5><FaUser /> Last Name:</h5>
                                <p>{user?.last_name || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5><FaInfoCircle /> Bio:</h5>
                                <p>{user?.bio || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5><FaMapMarkerAlt /> Address:</h5>
                                <p>{user?.address || 'N/A'}</p>
                            </div>
                            <div className="mb-3">
                                <h5><FaPhone /> Phone Number:</h5>
                                <p>{user?.phone_number || 'N/A'}</p>
                            </div>
                            <button onClick={() => setIsEditing(true)} className="btn btn-primary mt-3">
                                <FaEdit /> Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
