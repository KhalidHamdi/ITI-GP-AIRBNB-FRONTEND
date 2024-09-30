// src/components/forms/PasswordInput.jsx

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const PasswordInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="mb-2">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <div className="input-group">
        <input
          type={visible ? 'text' : 'password'}
          className="form-control"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={toggleVisibility}
          aria-label={visible ? 'Hide password' : 'Show password'}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 , height:50 }}

        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

PasswordInput.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
};

export default PasswordInput;
