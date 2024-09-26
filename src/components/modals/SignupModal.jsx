import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import useSignupModal from "../../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton.jsx";
import apiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";

const SignupModal = () => {
  const navigate = useNavigate();
  const signupModal = useSignupModal();
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState([]);

  const submitSignup = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password1: password1,
      password2: password2
    };

    const response = await apiService.postWithoutToken('/api/auth/register/', formData);

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      signupModal.close();
      navigate('/');
    } else {
      const tmpErrors = Object.values(response).flat();
      setErrors(tmpErrors);
    }
  };

  const content = (
    <form onSubmit={submitSignup}>
      <div className="mb-3">
        <label htmlFor="signupEmail" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="signupEmail"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="signupPassword1" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="signupPassword1"
          placeholder="Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="signupPassword2" className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="signupPassword2"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
      </div>

      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.map((error, index) => (
            <div key={`error_${index}`}>{error}</div>
          ))}
        </div>
      )}

      <CustomButton label="Submit" type="submit" />
    </form>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
