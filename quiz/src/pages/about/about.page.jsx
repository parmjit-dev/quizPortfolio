import React, { useState, useContext } from 'react';
import { store } from '../../store/store';
import './dashboard.style.scss';

const DashBoard = (props) => {
  const globalState = useContext(store);
  console.log(globalState);
  return (
    <div className="dashboard">
    <h1> Dashboard </h1>
      <h1>
        {globalState.user}
      </h1>
    </div>
  );
};

export default DashBoard