import Cookies from 'js-cookie'; 


export const handleLogin = (userId, accessToken, refreshToken) => {
    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Lax' });
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Lax' });
    localStorage.setItem('userId', userId);
};

export const handleLogout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('csrftoken');
  localStorage.removeItem('userId');
};


