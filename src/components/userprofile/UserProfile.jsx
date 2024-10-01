// src/components/userprofile/UserProfile.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios'; 
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../redux/modalSlice';

// Material-UI Components
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Avatar,
    Paper,
    CircularProgress,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const UserProfile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, reset, formState: { errors }, watch } = useForm({
        defaultValues: {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            bio: '',
            address: '',
            phone_number: '',
            avatar: null,
        }
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/auth/profile/');
            setUser(response.data);
            reset({
                username: response.data.username || '',
                email: response.data.email || '',
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
                bio: response.data.bio || '',
                address: response.data.address || '',
                phone_number: response.data.phone_number || '',
                avatar: null,
            });
            setAvatarPreview(response.data.avatar || null);
        } catch (err) {
            toast.error('Failed to fetch user profile. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setAvatarPreview(data.avatar ? URL.createObjectURL(data.avatar[0]) : avatarPreview);
        const form = new FormData();
        form.append('username', data.username);
        form.append('email', data.email);
        form.append('first_name', data.first_name);
        form.append('last_name', data.last_name);
        form.append('bio', data.bio);
        form.append('address', data.address);
        form.append('phone_number', data.phone_number);
        if (data.avatar && data.avatar.length > 0) {
            form.append('avatar', data.avatar[0]);
        }

        try {
            const response = await axiosInstance.put('/api/auth/profile/', form, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUser(response.data);
            toast.success('Profile updated successfully!');
        } catch (err) {
            toast.error('Failed to update profile. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('authToken');
        toast.info('Logged out successfully.');
        dispatch(openLoginModal());
    };

    if (loading && !user) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '30px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    User Profile
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
                        <Avatar
                            src={avatarPreview}
                            alt={user?.username}
                            sx={{ width: 150, height: 150, margin: 'auto' }}
                        />
                        <Controller
                            name="avatar"
                            control={control}
                            render={({ field }) => (
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<PhotoCamera />}
                                    sx={{ mt: 2 }}
                                >
                                    Upload Avatar
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            if (e.target.files.length > 0) {
                                                setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }}
                                    />
                                </Button>
                            )}
                        />
                        {errors.avatar && (
                            <Typography color="error" variant="body2">
                                {errors.avatar.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                {/* Username */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="username"
                                        control={control}
                                        rules={{ 
                                            required: 'Username is required',
                                            maxLength: {
                                                value: 20,
                                                message: 'Username cannot exceed 20 characters'
                                            },
                                            minLength: {
                                                value: 1,
                                                message: 'Username cannot be blank'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Username"
                                                fullWidth
                                                error={!!errors.username}
                                                helperText={errors.username ? errors.username.message : ''}
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Email */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{ 
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Enter a valid email address'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Email"
                                                type="email"
                                                fullWidth
                                                error={!!errors.email}
                                                helperText={errors.email ? errors.email.message : ''}
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* First Name */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="first_name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="First Name"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Last Name */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="last_name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Last Name"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Bio */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="bio"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Bio"
                                                multiline
                                                rows={4}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Address */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Address"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Phone Number */}
                                <Grid item xs={12}>
                                    <Controller
                                        name="phone_number"
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^[0-9+\-() ]+$/,
                                                message: 'Enter a valid phone number'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Phone Number"
                                                fullWidth
                                                error={!!errors.phone_number}
                                                helperText={errors.phone_number ? errors.phone_number.message : ''}
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Buttons */}
                                <Grid item xs={12} style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleLogout}
                                        sx={{ mr: 2 }}
                                    >
                                        Logout
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default UserProfile;
