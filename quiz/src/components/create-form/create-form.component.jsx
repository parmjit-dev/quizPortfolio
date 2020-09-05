import React, { useState, useContext } from 'react';
import axios from 'axios';
import './create-form.style.scss';
import { questionStore } from '../../store/questionStore';
import { store } from '../../store/store';

const api = process.env.REACT_APP_API_QUESTION;
const quizAPI = process.env.REACT_APP_API_QUIZ;

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);
const CreateQuestion = () => {
  const globalState = useContext(questionStore);
  const { dispatch } = globalState;
  const globalUserState = useContext(store);

  const [post, setPost] = useState({
    question: '',
    answerSelectionOne: '',
    answerSelectionTwo: '',
    answerSelectionThree: '',
    answerSelectionFour: '',
    correctAnswer: parseInt('', 10),
    image: '',
  });

  const [quizPost, setQuizPost] = useState({
    title: '',
    questions: [],
    user: globalUserState.state._id,
  });

  const handleSuccess = async (res) => {
    // console.log(userData.data);
    const { questions } = quizPost;
    questions.push(res.data.data.Question._id);
    await dispatch({ ...res.data.data, type: 'SET_QUESTION' });
    await setQuizPost({ ...quizPost, [questions]: questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(api, post)
      .then((res) => { handleSuccess(res); }).catch((err) => { console.log(err); });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'title') return setQuizPost({ ...quizPost, [id]: value });
    if (id === 'correctAnswer') return setPost({ ...post, [id]: parseInt(value, 10) });
    setPost({ ...post, [id]: value });
  };

  const handleSuccessQuiz = async (e) => {
    e.preventDefault();
    const { questions, title, user } = quizPost;
    const newPost = { title, questions, user };
    console.log(newPost);
    await axios.post(quizAPI, newPost);
  };

  return (
    <div>
      <form className="question-form" onSubmit={handleSubmit}>
        <div className="form-input-material">
          {/*  htmlFor is to tell react what thehtml entered is going to be for */}
          <label htmlFor="title">
            {' '}
            <h1>Question Title</h1>
            <input
              type="text"
              id="question"
              className="form-control-material"
              onChange={handleChange}
            />
            {' '}
          </label>

        </div>
        <div className="form-input-material">
          <div className="form-input-material">
            <label htmlFor="image">
              {' '}
              Image

              <input
                type="image"
                id="image"
                className="form-control-material"
              />
            </label>
          </div>
        </div>
        <div className="form-input-material">
          <h1 htmlFor="answers"> Answers </h1>
          <div className="form-input-material">
            <input
              type="text"
              id="answerSelectionOne"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={1} onClick={handleChange} />

            <input
              type="text"
              id="answerSelectionTwo"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={2} onClick={handleChange} />

            {' '}
            <input
              type="text"
              id="answerSelectionThree"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={3} onClick={handleChange} />

            {' '}
            <input
              type="text"
              id="answerSelectionFour"
              className="form-control-material"
              onChange={handleChange}
            />
            <input type="radio" name="correctAnswer" id="correctAnswer" value={4} onClick={handleChange} />

          </div>
        </div>
        <button type="submit" className="btn"> Submit Question </button>
      </form>
      <form className="quizForm" onSubmit={handleSuccessQuiz}>
          <div>
            <label> Question Title </label>
            <input
              type="text"
              id="title"
              className="form-control-material"
              onChange={handleChange}
            />
            <button type="submit" className="btn"> Submit Quiz </button>
          </div>
        </form>
    </div>
  );
};

export default CreateQuestion;
