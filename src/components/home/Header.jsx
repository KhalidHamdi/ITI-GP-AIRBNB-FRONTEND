import React from "react";
import AppLogo from "./AppLogo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useDispatch } from "react-redux";
import { openAddPropertyModal } from "../../redux/modalSlice";
import { Switch } from "@mui/material";

const Header = ({ toggleDarkMode, darkMode }) => {
  const dispatch = useDispatch();

  const airbnbYourHome = () => {
    dispatch(openAddPropertyModal());
  };

  return (
    <nav className={`navbar navbar-expand-md navbar-${darkMode ? 'dark' : 'light'} shadow-sm`} 
      style={{
        backgroundColor: darkMode ? '#2c2c2c' : '#ffffff',
        color: darkMode ? '#f0f0f0' : '#2c2c2c',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem 2rem',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <AppLogo />

        {/* Center Navigation with Search */}
        <div className="d-flex flex-column align-items-center w-50">
          <ul className="nav mb-2 d-flex gap-3">
            <li className="nav-item">
              <a className={`nav-link fw-bold ${darkMode ? 'text-light' : 'text-dark'} hover-underline`} href="#">
                Stays
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link fw-bold ${darkMode ? 'text-light' : 'text-dark'} hover-underline`} href="#">
                Experiences
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link fw-bold ${darkMode ? 'text-light' : 'text-dark'} hover-underline`} href="#">
                Online Experiences
              </a>
            </li>
          </ul>
          <Search />
        </div>

        {/* Right-side Menu */}
        <div className="d-flex align-items-center gap-4">
          <button
            className={`btn btn-link ${darkMode ? 'text-light' : 'text-dark'} text-decoration-none fw-bold`}
            style={{ whiteSpace: "nowrap", fontSize: "0.9rem", padding: '0.5rem 1rem' }}
            onClick={airbnbYourHome}
          >
            Airbnb your home
          </button>

          {/* Language and Globe Icon */}
          <button className={`btn btn-link p-0 ${darkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '1.25rem' }}>
            <i className="bi bi-globe"></i>
          </button>

          {/* Dark Mode Switch */}
          <div className="d-flex align-items-center">
            <Switch onChange={toggleDarkMode} checked={darkMode} />
            <span className={`ms-2 ${darkMode ? 'text-light' : 'text-dark'}`}>Dark Mode</span>
          </div>

          {/* User Menu */}
          <UserMenu airbnbYourHome={airbnbYourHome} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
