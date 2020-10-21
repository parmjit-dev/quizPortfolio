import React , {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import UpdateQuestions from '../../components/updateQuestions/updateQuestions.component';
import './updateQuiz.style.scss';
import axios from 'axios';

const quizAPI = process.env.REACT_APP_API_QUIZ;
const questionsAPI = process.env.REACT_APP_API_QUESTION;

const UpdateQuiz = () => {
  const history = useHistory();
  const [quiz, setQuiz] = useState({
    id: '',
    title: '',
  });

  const [questions, setQuestions] = useState([
  ])

  const [question, setQuestion] = useState({
    // quizID: quiz.id,
  })
  useEffect(() => {
    async function getQuiz() {
      const param = window.location.search;
      const searchID = param.split('=');
      const Quiz = await axios.get(`${quizAPI}?_id=${searchID[1]}`);
      const {title, id} = Quiz.data.data.doc[0]
      setQuiz({title: title, id: id});
    }
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getQuestions() {
      if (quiz.id !== '') {
      const questionsArray = await axios.get(`${questionsAPI}?quizID=${quiz.id}`)
      console.log(questionsArray.data.data.doc)
      questionsArray.data.data.doc.forEach( (element , i) => {
        const { quizID, image, question, answerSelectionFour,answerSelectionThree,answerSelectionTwo,answerSelectionOne, correctAnswer, id } = element;
        setQuestions(values => [ ...values, {quizID: quizID[0].id, id:id, image:image, question:question, answerSelectionOne: answerSelectionOne, answerSelectionTwo:answerSelectionTwo, answerSelectionThree: answerSelectionThree, answerSelectionFour: answerSelectionFour, correctAnswer:correctAnswer}]);
      });
      }
    }
    getQuestions();
  }, [quiz.id])

  const handleClick = (e) => {
      const {id} = e.target
      const state = questions[id];
      setQuestion({...state})
  }
  
  const handleSubmit = async () => {
    await axios.patch(`${questionsAPI}/${question.id}`, question)
  }

  const handleChange = (e) => {
    const {id, value} = e.target
    setQuestion({...question, [id]:value})
  }
  return (
    <div>
    <h2> {quiz.title} </h2>
      { questions.map((element , i) => {
      const {question} = element;
      return (<a key={i} id={i} className='questionLink' onClick={handleClick}> {question} <br /></a>)
    })}
      {/* <UpdateQuestions /> */}
        <form onSubmit={(e) => e.preventDefault()} >
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
              <input
                type="file"
                name="photo"
              />
              {/* <button type="submit" className="btn" onClick={handleImageUpload}> submit </button> */}
        {/* { imageState ? (
        <img src={imageState} alt=' Placeholder '/>) : <div/>} */}
          <h2> Question Title </h2>
          <input
              type="text"
              id="question"
              onChange={handleChange}
              value={question.question || ''}
            />
          <h1 htmlFor="answers"> Answers </h1>
            <input
              type="text"
              id="answerSelectionOne"
              onChange={handleChange}
              value={question.answerSelectionOne || ''}

            />
            <input
              type="text"
              id="answerSelectionTwo"
              onChange={handleChange}
              value={question.answerSelectionTwo || ''}

            />
            {' '}
            <input
              type="text"
              id="answerSelectionThree"
              onChange={handleChange}
              value={question.answerSelectionThree || ''}

            />
            {' '}
            <input
              type="text"
              id="answerSelectionFour"
              onChange={handleChange}
              value={question.answerSelectionFour || ''}
            />
          <button type="submit" className="btn" onClick={handleSubmit}> Submit Quiz Title </button>
      </form>
    </div>
  )
}
export default UpdateQuiz;
