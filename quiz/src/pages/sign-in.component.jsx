import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
// import CustomButton from '../../components/custom-button/custom-button.component';
// import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import './sign-in.style.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();


		const { email, password} = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({email: '', password: ''})
		} catch (error) {
			console.error(error)
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target; //deconstructor the value and name

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div>
				<h2> Already have an account </h2>
				<span> SignIn </span>

				<form>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						handleChange={this.handleChange}
						label="email"
						required
					/>
					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="password"
						required
					/>

					<div className="buttons">
						<CustomButton type="submit"> Sign in </CustomButton>
						<CustomButton type="button" onClick={signInWithGoogle} isGoogle>
							{' '}
							Sign in with Google{' '}
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
