import React from 'react';
import { Link } from 'react-router-dom';
// import { FindUserQuiz } from '../../store/findQuiz';
import './landing_page.style.scss';


const Landing = () => {

  // const userQuiz = FindUserQuiz(api, state._id);
  // console.log(userQuiz);

  // useEffect(async () => {
  //   userQuiz = ;
  //   return userQuiz;
  // });

  // console.log(userQuiz);

  // const userQuiz = await axios.get(`${api}?user=${state._id}`);
  //
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
