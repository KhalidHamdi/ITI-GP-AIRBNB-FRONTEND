import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/ITI-bnb.png'; 

const AppLogo = () => {
  return (
    <Link to="/" className="navbar-brand">
      <img src={logo} alt="Airbnb" height="60" />
    </Link>
  );
};

export default AppLogo;
