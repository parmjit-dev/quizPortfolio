import React, { useContext } from 'react';
import axios from 'axios';
import { store } from '../../store/store';
// import Card from '../card/card.component';

import PreviewCollection from './preview-collection.component';
// import {connect} from 'react-redux';

// import {createStructeredSelector} from 'reselect';

// import './collections-overview.style.scss';

// import {PreviewCollection} from '../preview-collection/preview-colleciton.component'
const api = process.env.REACT_APP_API_QUIZ;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

const CollectionsOverview = async () => {
  const globalUserStore = useContext(store);
  const { state } = globalUserStore;
  const userQuiz = await axios.get(`${api}?user=${state._id}`);
  return (
    <div className="collections-overview">
    <h1> {userQuiz }</h1>
      {/* {userQuiz.map(({ id, ...otherCollectionProps }) => ( */}
        {/* <PreviewCollection key={id} {...otherCollectionProps} /> */}
      {/* ))} */}
    </div>
  );
};

// const mapState = createStructeredSelector({
//   collections: selectCollections,
// });

export default CollectionsOverview;
