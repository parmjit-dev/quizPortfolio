import React, { useState, useEffect } from 'react';
import CreateQuestion from '../../components/create-form/create-form.component';
import './createQuiz.style.scss';

const QuizPage = (props) => {
  const [profileState, setProfileState] = useState(props);
  return (
    <div>
      <CreateQuestion { ...profileState} />
    </div>
  );
};

export default QuizPage;
