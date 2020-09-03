import React, { useState } from 'react';
// import CustomButton from '../../components/custom-button/custom-button.component';
// import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import './sign-in.style.scss';
import axios from 'axios';

const SignIn = () => {
  const [post, setPost] = useState({
    email: '',
    password: '',
  });

  const api = process.env.API_SIGN_IN_UP;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(api, post)
        .then((res) => { console.log(res); }).catch((err) => { console.log(err); });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target; // deconstructor the value and name

    setPost({ [id]: value });
  };
  return (
    <div>
      <h2> Already have an account </h2>
      <span> SignIn </span>

      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          handleChange={handleChange}
          label="email"
          required
        />
        <input
          id="password"
          type="password"
          handleChange={handleChange}
          label="password"
          required
        />

        <div className="buttons">
          <button type="submit"> Sign in </button>
          {/* <button type="button" onClick={signInWithGoogle} isGoogle>
							{' '}
							Sign in with Google{' '}
						</button> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
