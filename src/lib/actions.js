// src/lib/actions.js

import Cookies from 'js-cookie'; 

export const handleLogin = (accessToken, refreshToken, userId, username) => {
  if (accessToken) {
    Cookies.set('authToken', accessToken, { sameSite: 'Lax' });
    console.log('Access token set successfully');

    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, { sameSite: 'Lax' });
    }

    localStorage.setItem('userId', userId);
    if (username) {
      localStorage.setItem('username', username);
    }
  } else {
    console.error('Access token not found in response');
  }
};

export const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('refreshToken'); // Ensure you remove the refresh token as well
    Cookies.remove('csrftoken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); // Remove the username from localStorage
    console.log('User logged out successfully');
};
