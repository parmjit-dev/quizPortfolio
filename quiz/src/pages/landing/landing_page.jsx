import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { store } from '../../store/store';
import './landing_page.style.scss';

const Landing = () => {
  const globalState = useContext(store);
  console.log(globalState);
  return (
    <div className="dashboard">
    <h1> Welcome to QuizzUP </h1>
      <p>
        The All in One Quiz design and distribution Service
      </p>
      <button>
      <Link className="option" to="/signin"> Signin </Link>
      </button>

    </div>
  );
};

export default Landing;