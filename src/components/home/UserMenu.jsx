// src/components/UserMenu.js

import React from 'react';
import { Menu } from 'lucide-react';
import AvatarComponent from './Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal, openSignupModal } from '../../redux/modalSlice';
import { performLogout } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const UserMenu = ({ airbnbYourHome }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      // Optionally, call backend logout endpoint to invalidate tokens
      // await axiosInstance.post('/api/auth/logout/', {}, {
      //   headers: {
      //     Authorization: `Bearer ${Cookies.get('authToken')}`,
      //   },
      // });

      // Dispatch the logout thunk to clear auth state
      await dispatch(performLogout()).unwrap();

      toast.success("See you soon :)!", {
        onClose: () => navigate('/'),
      });
    } catch (error) {
      console.error('Logout Error:', error.response?.data || error.message);
      toast.error('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn d-flex align-items-center gap-2 p-2 rounded-circle border"
        type="button"
        id="userMenuDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Menu />
        {isLoggedIn && (
          <AvatarComponent avatarUrl={user?.avatar} />
        )}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuDropdown">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile" className="dropdown-item">
                User Profile
              </Link>
            </li>
            <li>
              <Link to="/chat" className="dropdown-item">
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/MyReservations" className="dropdown-item">
                My Reservations
              </Link>
            </li>
            <li>
              <Link to="/my-favorites" className="dropdown-item">
                My Favorites
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={airbnbYourHome}>
                Airbnb your home
              </button>
            </li>
            <li>
              <button className="dropdown-item">Host an experience</button>
            </li>
            <li>
              <button className="dropdown-item">Help Center</button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="dropdown-item" onClick={() => dispatch(openLoginModal())}>
                Login
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => dispatch(openSignupModal())}>
                Sign up
              </button>
            </li>
            <li>
              <button className="dropdown-item">Help Center</button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  airbnbYourHome: PropTypes.func.isRequired,
};

export default UserMenu;
