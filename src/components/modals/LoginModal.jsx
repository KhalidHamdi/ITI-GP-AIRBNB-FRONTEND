import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";
import useLoginModal from "../../hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "../../lib/actions";
import apiService from "../../services/apiService";

const LoginModal = () => {
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submitLogin = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password
    };

    const response = await apiService.postWithoutToken('/api/auth/login/', formData);

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);

      loginModal.close();

      navigate('/');
    } else {
      setErrors(response.non_field_errors);
    }
  };

  const content = (
    <>
      <form onSubmit={submitLogin} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        {errors && errors.map((error, index) => (
          <div
            key={`error_${index}`}
            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
          >
            {error}
          </div>
        ))}

        <CustomButton label="Submit" type="submit" />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
