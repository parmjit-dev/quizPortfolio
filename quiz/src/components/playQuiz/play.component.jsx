import React, { useContext, useEffect, useState } from 'react';
import './play.style.scss';
import { scoreStore } from '../../store/scoreStore';

const Play = (props) => {
  const score = useContext(scoreStore);
  const { dispatch } = score;

  const { questions } = props.props;
  const [questionState, setQuestionState] = useState({
    currentScore: 0,
    currentQuestion: 0,
    title: '',
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
    correctAnswer: '',
  });

  useEffect(() => {
    function setElements() {
      handleChange();
    }
    setElements();
  }, [questions]);

  const handleChange = () => {
    if (questions.length > 0) {
      setQuestionState((state) => ({
        ...state,
        currentScore: 0,
        currentQuestion: (questionState.currentQuestion),
        title: questions[questionState.currentQuestion].question,
        optionOne: questions[questionState.currentQuestion].answerSelectionOne,
        optionTwo: questions[questionState.currentQuestion].answerSelectionTwo,
        optionThree: questions[questionState.currentQuestion].answerSelectionThree,
        optionFour: questions[questionState.currentQuestion].answerSelectionFour,
        correctAnswer: questions[questionState.currentQuestion].correctAnswer,
      }));
    }
  };

  const handleClick = (e) => {
    console.log(e.target.id);
    setQuestionState({ ...questionState, currentQuestion: (questionState.currentQuestion++) });
    if ((questions.length >= questionState.currentQuestion) === true) {
      handleChange();
    }
  };

  return (
    <div className="question-container">
      <h1 id="questionTitle">
        {questionState.title}
        ;
      </h1>
      <div id="results" />
      <span>
        <img className="question-image" src="https://www.w3schools.com/images/w3schools_green.jpg" />
      </span>

      <button onClick={handleClick} id="1">
        {questionState.optionOne}
      </button>
      <button onClick={handleClick} id="2">
        {questionState.optionTwo}
      </button>
      <button onClick={handleClick} id="3">
        {questionState.optionThree}
      </button>
      <button onClick={handleClick} id="4">
        {questionState.optionFour}
      </button>

    </div>
  );
};

export default Play;
