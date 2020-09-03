import React, { useState } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import './sign-up.styles.scss';

dotenv.config({ path: './config.env' });

const signUp = () => {
  const [post, setPost] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match"); // adjust the alert button
      return;
    }

    try {
      await axios.post(process.env.API_SIGN_IN_UP, post)
        .then((res) => { console.log(res); }).catch((err) => { console.log(err); });
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPost({ [id]: value });
  };
  return (
    <div className="sign-up">
      <h2 className="title"> Don't Have an Account? </h2>
      <span> Sign up with email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="displayName"
          onChange={handleChange}
          label="Display Name"
          required
        />
        <input
          type="email"
          id="email"
          onChange={handleChange}
          label="Email"
          required
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          label="Password"
          required
        />
        <input
          type="text"
          id="confirmPassword"
          onChange={handleChange}
          label="Confirm Passowrd"
          required
        />
      </form>
      <button type="submit"> Sign Up </button>
    </div>
  );
};

export default signUp;
