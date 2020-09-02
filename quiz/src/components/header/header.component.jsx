import React from 'react';
import { Link } from 'react-router-dom';
// import {connect} from 'react-redux'
// import { createStructuredSelector} from 'reselect';
// import {selectCurrentUser} from '../../redux/user/user.selector'
import './header.style.scss';

const Header = () => (
  <div className="header">
    <div className="options">
      <span className="option" to="/quiz"> quiz </span>
      <span className="option" to="/dashboard"> dashboard </span>
      <span className="option" to="/about"> About </span>
      <span className="option" to="/signin"> Signin </span>

    </div>
  </div>
);

export default Header;

// const mapState = createStructuredSelector({
// 	currentUser: selectCurrentUser,
// })

// export default connect(mapState)(Header);
