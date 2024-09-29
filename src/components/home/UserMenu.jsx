import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import AvatarComponent from './Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openLoginModal, openSignupModal } from '../../redux/modalSlice';
import { handleLogout } from '../../lib/actions';
import Cookies from 'js-cookie';

const UserMenu = ({ airbnbYourHome }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        setIsLoggedIn(!!authToken); 
    }, []);

    const logout = async () => {
        await handleLogout();
        setIsLoggedIn(false); 
        navigate('/'); 
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
                <AvatarComponent />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuDropdown">
                {isLoggedIn ? (
                    <>
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
                            <button className="dropdown-item" onClick={logout}>
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

export default UserMenu;
