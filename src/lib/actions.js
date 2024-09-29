import Cookies from 'js-cookie'; 

export const handleLogin = (accessToken, refreshToken, userId) => {
  if (accessToken) {
    Cookies.set('authToken', accessToken, { sameSite: 'Lax' });
    console.log('Access token set successfully');
    
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, { sameSite: 'Lax' });
    }
    
    localStorage.setItem('userId', userId);
  } else {
    console.error('Access token not found in response');
  }
};


export const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('csrftoken');
    localStorage.removeItem('userId');  
    console.log('User logged out successfully');
};
