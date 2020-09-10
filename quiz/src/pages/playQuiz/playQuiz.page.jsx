import React, { useContext, useState } from 'react';
import * as qs from 'query-string';
import { useLocation } from 'react-router';
import axios from 'axios';
import './playQuiz.style.scss';

const quizAPI = process.env.REACT_APP_API_QUIZ;
console.log(window.location.search);

const playQuiz = () => {
  const parsed = qs.parse(window.location.search);
  console.log(parsed);
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  // const location = useLocation();

  // console.log(qs.parse(location.search));

  // useEffect(() => {
  //   async function getQuiz() {
  //     const Quiz = await axios.get(`${api}?user=${state._id}`);
  //     const { doc } = userQuiz.data.data;
  //     console.log(doc);
  //     const titleArray = [];
  //     // let questionsArray = [];
  //     const idArray = [];
  //     // console.log(doc.length);
  //     for (let i = 0; i < doc.length; i++) {
  //       const { title, _id } = doc[i];
  //       setTitles((prevState) => [...prevState, title]);
  //       setId((prevState) => [...prevState, _id]);
  //     }
  //   }
  //   getQuiz();
  // }, []);


  return (
    <div />
  );
};

export default playQuiz;
