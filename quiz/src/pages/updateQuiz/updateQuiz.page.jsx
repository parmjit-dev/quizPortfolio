import React , {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
// import UpdateQuestions from '../../components/updateQuestions/updateQuestions.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import './updateQuiz.style.scss';
import axios from 'axios';

const quizAPI = process.env.REACT_APP_API_QUIZ;
const questionsAPI = process.env.REACT_APP_API_QUESTION;
const uploadAPI = process.env.REACT_APP_API_UPLOADS

const UpdateQuiz = () => {
  const history = useHistory();
  const [quiz, setQuiz] = useState({
    id: '',
    title: '',
  });
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState({})
  const [file, setFile] = useState('');
  const [imageState, setImageState] = useState({
    file: null,
  });

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
      setImageState({file:state.image});

  }

  //   const handleFileUpload = async (e) => { //submitting image first then posting the data
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('photo', file);
  //   let res = await axios.post(uploadAPI, formData);
  //   setPost({...post, image:res.data.file});
  // };

  
  const handleSubmit = async () => {
    await axios.patch(`${questionsAPI}/${question.id}`, question)
    window.location.reload();
  }

  const handleDelete = (e) => {
    const {id} = e.currentTarget;
    axios.delete(`${questionsAPI}/${id}`);
    window.location.reload();
  }

  const handleChange = (e) => {
    const {id, value} = e.target    
    setQuestion({...question, [id]:value})
  }

    const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setImageState(URL.createObjectURL(image));
  }

    const handleAddQuestion = () => {
    const {id, title} = quiz;
    history.push({
          pathname:`/createQuizzes`,
          state:{id, title},
    })
  };

  return (
    <div>
    <h2> {quiz.title} </h2>

    <div className="questionOptions">
      { questions.map((element , i) => {
        const {question} = element;
        return (
          <div key={i} className="cross"> 
          <button key={i} id={i} className='questionLink' onClick={handleClick}> 
          {question} 
          {/* // eslint-disable-next-line */}
          <a className="delete" key={i} id={element.id} onClick={handleDelete}><FontAwesomeIcon key={i} className="fontIcon" id={element.id} icon={faTimes} size="2x" /></a> 
          <br />
          </button>
          </div>
          
          )
      })}
    </div>
      <button className="newQuestion" onClick={handleAddQuestion} > Add New Question </button>
      {/* <UpdateQuestions /> */}
      <div className="form-container">
        <form className="changeQuestionForm" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data" >
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
              />
              {/* <button type="submit" className="btn" onClick={handleImageUpload}> submit </button> */}
        { imageState.file  ? imageState.file.includes("uploads") ? (
        <img src={imageState} alt=' Placeholder ' /> ) : ( <img src={require(`../../../public/${imageState.file}`)} alt=' Placeholder '/> )  : <div /> }
              {/* <button type="submit" className="btn" onClick={handleImageUpload}> submit </button> */}
        {/* { imageState ? (
        <img src={imageState} alt=' Placeholder '/>) : <div/>} */}
          
          <h2> Question Title </h2>
          
          <input
              className = "inputField"
              type="text"
              id="question"
              onChange={handleChange}
              value={question.question || ''}
            />
          <h1 htmlFor="answers"> Answers </h1>
            <input
              className = "inputField"
              type="text"
              id="answerSelectionOne"
              onChange={handleChange}
              value={question.answerSelectionOne || ''}

            />
            <input
              className = "inputField"
              type="text"
              id="answerSelectionTwo"
              onChange={handleChange}
              value={question.answerSelectionTwo || ''}

            />
            {' '}
            <input
              className = "inputField"
              type="text"
              id="answerSelectionThree"
              onChange={handleChange}
              value={question.answerSelectionThree || ''}

            />
            {' '}
            <input
              className = "inputField"
              type="text"
              id="answerSelectionFour"
              onChange={handleChange}
              value={question.answerSelectionFour || ''}
            />
          <button type="submit" className="btn" onClick={handleSubmit}> Change Question </button>
      </form>
      </div>
    </div>
  )
}
export default UpdateQuiz;
