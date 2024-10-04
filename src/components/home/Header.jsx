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
    <nav className={`navbar navbar-expand-md navbar-${darkMode ? 'dark' : 'light'} border-bottom`} style={{
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)'
    }}>
      <div className="container-fluid px-md-5">
        <AppLogo />
        <div className="d-flex flex-column align-items-center w-100">
          <ul className="nav mb-1">
            <li className="nav-item">
              <a className={`nav-link fw-medium ${darkMode ? 'text-light' : 'text-dark'}`} href="#">
                Stays
              </a>
            </li>
          </ul>
          <Search />
        </div>
        <div className="d-flex align-items-center">
          <button
            className={`btn btn-link ${darkMode ? 'text-light' : 'text-dark'} text-decoration-none me-1 fw-bold`}
            style={{ whiteSpace: "nowrap" }}
            onClick={airbnbYourHome}
          >
            Airbnb your home
          </button>
          <button className={`btn btn-link ${darkMode ? 'text-light' : 'text-dark'} me-1`}>
            <i className="bi bi-globe" onClick={airbnbYourHome}></i>
          </button>

          <div className="d-flex align-items-center">
            <Switch onChange={toggleDarkMode} checked={darkMode} />
            <span className={`ms-2 ${darkMode ? 'text-light' : 'text-dark'}`}>Dark Mode</span>
          </div>
        </div>
        <UserMenu airbnbYourHome={airbnbYourHome} />
      </div>
    </nav>
  );
};

export default Header;