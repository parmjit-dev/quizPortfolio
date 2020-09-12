import React, { useContext } from 'react';
import { scoreStore } from '../../store/scoreStore';

const Play = (question, answers, correctAnswer) => {
  const score = useContext(scoreStore);
  const { dispatch } = score;
  const questions = [];

  questions.map(answers.forEach((e, i) => {
    if (e) {
      return (
        <button id="submit" onClick={handleClick} className={i}>
          {' '}
          {e}
          {' '}
        </button>
      );
    }
  }));

  const handleClick = (e) => {
    const { className } = e;
    if (className === correctAnswer) {
      return (dispatch({ type: 'CORRECT' }));
    }
  };
  return (
    <div>
      <div id="quizTitle">
        {' '}
        {question}
      </div>
      <div id="results" />
    </div>

  );
};

export default Play;
