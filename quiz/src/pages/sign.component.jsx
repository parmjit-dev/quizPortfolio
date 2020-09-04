import React, { useState } from 'react';
import SignIn from './sign-in.component';
import SignUp from './sign-up.component';
import './sign.style.scss';

const SignInAndUp = (props) => {
  const [profileState, setProfileState] = useState(props);
  return (
    <div className="sign-in-up">
      <SignIn {...profileState} />
      <SignUp {...profileState} />
    </div>
  );
};

export default SignInAndUp;
