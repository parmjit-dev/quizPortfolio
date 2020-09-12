import React, { useContext, useState, useEffect } from 'react';
import * as qs from 'query-string';
// import { useLocation } from 'react-router';
// import axios from 'axios';
import PlayQuiz from '../../components/playQuiz/playQuiz.component';
import './playQuiz.style.scss';

// const quizAPI = process.env.REACT_APP_API_QUIZ;

const PlayQuizPage = () => (
  <div>
    <PlayQuiz />
  </div>
);

export default PlayQuizPage;
