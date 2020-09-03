import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './create-form.style.scss';

const CreateQuestion = () => {
  const api = process.env.REACT_APP_API_QUESTION;

  const [post, setPost] = useState({
    question: '',
    answerSelectionOne: '',
    answerSelectionTwo: '',
    answerSelectionThree: '',
    answerSelectionFour: '',
    correctAnswer: parseInt('', 10),
    image: '',
  });
  // const [post, setPost] = useState('');
  // const [responseToPost, setResponseToPost] = useState('');
  // const [response, setResponse] = useState('');

  // const callAPI = async () => {
  //   const responseCall = await fetch('http://127.0.0.1:5000/api/v1/question');
  //   const body = await responseCall.json();
  //   if (responseCall.status !== 200) throw Error(body.message);
  //   return body;
  // };
      // {/* <button type="submit" className="btn" onClick={}> Submit Quiz </button> */}


  // useEffect(() => {
  //   callAPI().then((res) => setResponse({ response: res.express }))
  //     .catch((err) => console.log(err));
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(api, post)
    .then((res) => { console.log(res); }).catch((err) => { console.log(err); });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'correctAnswer') setPost({ ...post, [id]: parseInt(value, 10) });
    setPost({ ...post, [id]: value });
  };

  return (
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
  );
};

export default CreateQuestion;
