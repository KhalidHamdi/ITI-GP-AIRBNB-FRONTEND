import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import useSignupModal from "../../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
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
    <>
      <form onSubmit={submitSignup} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Repeat password"
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
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
