import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../../store/store';
import CollectionsOverview from '../../components/card-collection/card-collection.component';
import './dashboard.style.scss';

const api = process.env.REACT_APP_API_QUIZ;
// import CollectionsOverview from '../../components/card-collection/card-collection.component';

const DashBoard = () => {
  const [quiz, setQuiz] = useState('');
  const globalState = useContext(store);

  console.log(globalState);
  const { state } = globalState;

  useEffect(() => {
    async function getQuizzes() {
      const userQuiz = await axios.get(`${api}?user=${state._id}`);
      setQuiz({ ...quiz, userQuiz });
    }
    getQuizzes();
  }, []);

  console.log(quiz);
  return (
    <div className="dashboard">
      <h1> Dashboard </h1>
      {/* <CollectionsOverview /> */}
    </div>
  );
};

export default DashBoard;
