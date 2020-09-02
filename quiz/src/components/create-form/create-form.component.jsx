import React, { useState } from 'react';
import './create-form.style.scss';
// const useFormField = (initialValue: string = "") => {
//   const [value, setValue] = React.useState(initialValue);
//   const onChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
//     []
//   );
//   return { value, onChange };
// };

const CreateQuestion = () => {
  // const response = '';
  const [post, setPost] = useState({
    question: '',
    answerSelectionOne: '',
    answerSelectionTwo: '',
    answerSelectionThree: '',
    answerSelectionFour: '',
    correctAnswer: parseInt(''),
    image: '',
  });
  const responseToPost = '';

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('http://127.0.0.1:3000/api/v1/question', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ body: { post } }),
  //   });
  //   const body = await response.text();
  // // this.setState({ responseToPost: body });
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
  };

  return (
  // <form onSubmit = {handleSubmit}>
    <form className="question-form">
      <div className="form-input-material">
        {/*  htmlFor is to tell react what thehtml entered is going to be for */}
        <label htmlFor="title">
          {' '}
          <h1>Question Title</h1>
          <input
            type="title"
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
          <input
            type="text"
            id="answerSelectionTwo"
            className="form-control-material"
            onChange={handleChange}

          />
          {' '}
          <input
            type="text"
            id="answerSelectionThree"
            className="form-control-material"
            onChange={handleChange}

          />
          {' '}
          <input
            type="text"
            id="answerSelectionFour"
            className="form-control-material"
            onChange={handleChange}

          />
        </div>
      </div>
      <button type="submit" className="btn"> Submit Question </button>
    </form>
  );
};

export default CreateQuestion;
