import React from 'react';
// import { Link } from 'react-router-dom';
// import {connect} from 'react-redux'
// import { createStructuredSelector} from 'reselect';
// import {selectCurrentUser} from '../../redux/user/user.selector'
import './header.style.scss';

const Header = () => (
  <nav className="header">
    <div className="container-fluid">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <span className="header-span"> About Me </span>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;

// const mapState = createStructuredSelector({
// 	currentUser: selectCurrentUser,
// })

// export default connect(mapState)(Header);
