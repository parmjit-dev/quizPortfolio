import React, { useState } from 'react';
// import CustomButton from '../../components/custom-button/custom-button.component';
// import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import './sign-in.style.scss';
import axios from 'axios';

const api = process.env.REACT_APP_API_SIGN_IN;

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [api];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const SignIn = () => {
  const storedJwt = localStorage.getItem('token');
  // set the web token to state -- if no token then set to null
  const [post, setPost] = useState({
    email: '',
    password: '',
  });
  const [jwt, setJwt] = useState(storedJwt || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post(api, post).then((res) => {
        localStorage.setItem('token', res.data.token);
        setJwt(res.data.token);
        console.log(res);
      }).catch((err) => console.log(err));

      // .then((res) => { console.log(res); }).catch((err) => { console.log(err); });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target; // deconstructor the value and name
    setPost({ ...post, [id]: value });
  };
  return (
    <div>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2> Already have an account </h2>
        <span> SignIn </span>
        <input
          id="email"
          type="email"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit"> Sign in </button>
        {/* <button type="button" onClick={signInWithGoogle} isGoogle>
							{' '}
							Sign in with Google{' '}
						</button> */}
      </form>
    </div>
  );
};

export default SignIn;
