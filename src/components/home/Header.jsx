import React from 'react';
import AppLogo from './AppLogo';
import Search from './Search';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom" >
      <div className="container-fluid px-md-5">
        <AppLogo />

        <div className="d-flex flex-column align-items-center w-100">
          <ul className="nav mb-1">
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="#">Stays</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-muted" href="#">Experiences</a>
            </li>
          </ul>

          <Search />
        </div>

        <div className="d-flex align-items-center">
        <a href="#" className="text-dark text-decoration-none me-1 fw-bold" style={{ whiteSpace: 'nowrap' }}>
        Airbnb your home
        </a>
        <button className="btn btn-link text-dark me-1">
            <i className="bi bi-globe"></i>
          </button>
          </div>
        <UserMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
