// src/lib/actions.js

export const handleLogin = (userId, accessToken, refreshToken) => {
    // Save tokens and user info to localStorage or state
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
    // Dispatch actions to update user state if using Redux
  };
  