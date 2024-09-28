import Cookies from 'js-cookie'; 

export const handleLogin = (key, userId) => {
    if (key) {
        Cookies.set('authToken', key, { secure: true, sameSite: 'Lax' });
        console.log('Token set successfully');
        
        localStorage.setItem('userId', userId);
        console.log('User ID set successfully');
    } else {
        console.error('Token not found in response');
    }
};

export const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('csrftoken');
    localStorage.removeItem('userId');  
    console.log('User logged out successfully');
};
