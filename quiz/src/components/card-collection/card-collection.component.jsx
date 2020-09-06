import React, {useContext} from 'react';
import {store} from '../../store';
import Card from '../card/card.component';
// import {connect} from 'react-redux';

// import {createStructeredSelector} from 'reselect';

// import './collections-overview.style.scss';

// import {PreviewCollection} from '../preview-collection/preview-colleciton.component'

const CollectionsOverview = () => {
  const globalUserStore = useContext(store);
  // const { state, dispatch } = globalUserStore;
  return (
    <div className='collections-overview'>
        {collections.map(({ id, ...otherCollectionProps }) => (
					<PreviewCollection key={id} {...otherCollectionProps} />
				))}
    </div>
)};

const mapState = createStructeredSelector({
    collections: selectCollections
})

export default connect(mapState)(CollectionsOverview)