import React from 'react';
import { Link } from 'react-router-dom';

const AppLogo = () => {
  return (
    <Link to="/" className="navbar-brand">
      <img src="../src/assets/ITI-bnb.png" alt="Airbnb" height="70" />
    </Link>
  );
};

export default AppLogo;