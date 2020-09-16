import React from 'react';
import { Link } from 'react-router-dom';

import './card.component.scss';

const Card = (props) => {
  const { titles, ID } = props;
  console.log(ID);
  return (
    <div className="quiz-collections" key={ID}>
      <Link
        className="image"
        style={{ backgroundImage: 'url(https://www.w3schools.com/images/w3schools_green.jpg)' }}
        // onClick={}
        to={`/playQuiz/?ID=${ID}`}
      />
      <div className="collection-footer">
        <span className="name">{titles}</span>
        {/* <button className="price">{ID}</button> */}
      </div>
      {/* <CustomButton onClick={() => addItem(item)} inverted> Add To Cart </CustomButton> */}
    </div>
  );
};

export default Card;
