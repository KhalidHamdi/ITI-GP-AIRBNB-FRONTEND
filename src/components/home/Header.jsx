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
    <nav className={`navbar navbar-expand-md navbar-${darkMode ? 'dark' : 'light'} border-bottom p-2 pb-3 mb-2`} style={{
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)'
    }}>
      <div className="container-fluid px-md-5">
        <AppLogo />
        <div className="d-flex flex-column align-items-center w-100 mt-3">
          {/* <ul className="nav mb-1">
            <li className="nav-item">
              <a className={`nav-link fw-medium ${darkMode ? 'text-light' : 'text-dark'}`} href="#">
                Stays
              </a>
            </li>
          </ul> */}
          <Search />
        </div>
        <div className="d-flex align-items-center">
          <div className="me-4 d-flex ">
          <button
            className={`btn btn-link ${darkMode ? 'text-light' : 'text-dark'} text-decoration-none p-0 fw-bold`}
            style={{ whiteSpace: "nowrap" }}
            onClick={airbnbYourHome}
          >
            Airbnb your home
          </button>
          <button className={`btn btn-link ${darkMode ? 'text-light' : 'text-dark'} p-0`}>
            <i className="bi bi-globe" onClick={airbnbYourHome}></i>
          </button>
          </div>
          <div className="d-flex align-items-center me-4">
            <Switch onChange={toggleDarkMode} checked={darkMode} />
            <span className={`${darkMode ? 'text-light' : 'text-dark'} fw-bold p-0`}>{darkMode ? 'Light' : 'Dark'} </span>
          </div>
        </div>
        <UserMenu airbnbYourHome={airbnbYourHome} />
      </div>
    </nav>
  );
};

export default Header;