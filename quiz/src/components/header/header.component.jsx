import React from 'react';
import { Link } from 'react-router-dom';
// import {connect} from 'react-redux'
// import { createStructuredSelector} from 'reselect';
// import {selectCurrentUser} from '../../redux/user/user.selector'
import './header.style.scss';

const Header = () => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/quiz"> quiz </Link>
      <Link className="option" to="/dashboard"> dashboard </Link>
      <Link className="option" to="/about"> About </Link>
      <Link className="option" to="/signin"> Signin </Link>

    </div>
  </div>
);

export default Header;

// const mapState = createStructuredSelector({
// 	currentUser: selectCurrentUser,
// })

// export default connect(mapState)(Header);
