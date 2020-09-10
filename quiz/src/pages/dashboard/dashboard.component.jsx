/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../../store/store';
import CollectionsOverview from '../../components/card-collection/card-collection.component';
import './dashboard.style.scss';
import Card from '../../components/card/card.component';

const api = process.env.REACT_APP_API_QUIZ;
// import CollectionsOverview from '../../components/card-collection/card-collection.component';

const DashBoard = () => {
  const [titles, setTitles] = useState([]);
  const [id, setId] = useState([]);
  const globalState = useContext(store);

  console.log(globalState);
  const { state } = globalState;

  useEffect(() => {
    async function getQuizzes() {
      const userQuiz = await axios.get(`${api}?user=${state._id}`);
      const { doc } = userQuiz.data.data;
      console.log(doc);
      const titleArray = [];
      // let questionsArray = [];
      const idArray = [];
      // console.log(doc.length);
      for (let i = 0; i < doc.length; i++) {
        const { title, _id } = doc[i];
        setTitles((prevState) => [...prevState, title]);
        setId((prevState) => [...prevState, _id]);
      }
    }
    // const { title, questions } = doc[0];
    // console.log(title, questions);
    // console.log(userQuiz.data.data.doc[0]);
    getQuizzes();
  }, []);
  const array = Object.values(titles);
  return (
    <div className="dashboard">
      <h1> Dashboard </h1>
      {/* <h1>{quiz.titleArray}</h1> */}
      {/* <CollectionsOverview /> */}
      <div>
        {array.map((value, index) => <div><Card titles={value} ID={id[index]} /></div>)}
      </div>
      {/* <Card titles={title} ID={id} /> */}
    </div>
  );
};

export default DashBoard;
