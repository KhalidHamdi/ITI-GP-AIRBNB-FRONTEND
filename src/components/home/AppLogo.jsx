import React from 'react';
import { Link } from 'react-router-dom';

const AppLogo = () => {
  return (
    <Link to="/" className="navbar-brand">
      <img src="../src/assets/Airbnb_Logo.png" alt="Airbnb" height="32" />
    </Link>
  );
};

export default AppLogo;