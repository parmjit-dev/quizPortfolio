import React from 'react';

import FormInput from '../../components/form-input/form-input.component';

import CustomButton from '../../components/custom-button/custom-button.component';

import {auth, createUserProfileDoc} from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword} = this.state;

    if(password !== confirmPassword) {
        alert("passwords don't match");
        return;
    }

    try {
        const {user} = await auth.createUserWithEmailAndPassword(email, password)

        this.setState({ //clears the form
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''})

       await createUserProfileDoc(user, {displayName});
    } catch (error) {
        console.error(error)

    }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState ({[name] : value })
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'> Don't Have an Account? </h2>
                <span> Sign up with email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Display Name'
                    required
                    />
                       <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required
                    />
                       <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required
                    />
                       <FormInput
                    type='text'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Passowrd'
                    required
                    />
                    <CustomButton type='submit'> Sign Up </CustomButton>
                </form>


            </div>
        )
    }
}

export default SignUp;