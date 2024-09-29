import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'; 
import Cookies from 'js-cookie';

const CustomAlert = ({ message, type }) => (
  <div className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'} mt-4`} role="alert">
    {message}
  </div>
);

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ username: '', email: '', avatar: null });
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

            const response = await axiosInstance.get('/api/auth/profile/');
            setUser(response.data);
            setFormData({
                username: response.data.username,
                email: response.data.email,
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
        
        const form = new FormData();
        form.append('username', formData.username);
        form.append('email', formData.email);
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
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
            fetchUserProfile(); 
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="container mt-5 p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4 text-center">User Profile</h2>
            
            {error && <CustomAlert message={error} type="error" />}
            {success && <CustomAlert message={success} type="success" />}
            
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
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
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary me-2">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    {user?.avatar && (
                        <div className="mb-3">
                            <p><strong>Avatar:</strong></p>
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="rounded-circle"
                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary mt-3">
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
