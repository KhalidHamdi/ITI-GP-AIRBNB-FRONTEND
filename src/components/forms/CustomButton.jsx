// src/components/forms/CustomButton.jsx
import React from 'react';

const CustomButton = ({ label, type = 'button', onClick }) => (
  <button type={type} onClick={onClick} className="btn btn-primary w-100">
    {label}
  </button>
);

export default CustomButton;
