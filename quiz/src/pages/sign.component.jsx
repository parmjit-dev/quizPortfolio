import React from 'react';
import SignIn from './sign-in.component';
import SignUp from './sign-up.component'
import './sign.style.scss';

const SignInAndUp = () => (
	<div className="sign-in-out">
		<SignIn />
		<SignUp />
	</div>
);

export default SignInAndUp;
