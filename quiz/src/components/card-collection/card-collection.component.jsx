import React, { useContext } from 'react';
import Card from '../card/card.component';

import PreviewCollection from './preview-collection.component';
// import {connect} from 'react-redux';

// import {createStructeredSelector} from 'reselect';

// import './collections-overview.style.scss';

// import {PreviewCollection} from '../preview-collection/preview-colleciton.component'
// { /* { idArray.forEach((idElement) => titleArray.forEach((titleElement) => <PreviewCollection id={idElement} title={titleElement} />))} */ }

const CollectionsOverview = (titles, ID) => {
  console.log(titles, ID);
  // const values = Object.entries(props);
  // // for (let i = 0; i<values.length;i++) {
  // // }
  // const { titleArray, idArray } = values[0];
  // // console.log(typeof titleArray);
  // console.log(values);
  // titles.forEach((i) => (console.log(i)));
  // // values[0].map()
  // // });
  return (
    <div className="collections-overview">
      {/* {loop} */}
      
    </div>
  );
};
// const mapState = createStructeredSelector({
//   collections: selectCollections,
// });

export default CollectionsOverview;
