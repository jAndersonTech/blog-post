import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import '../css/login_form.css';

class LoginForm extends Component {

	constructor(props) {
		super(props);

		this.state = { email: "", password: "" };
	}

	static contextTypes = {
		router: PropTypes.object
	};

	componentWillReceiveProps({ auth }) {
		
		if(auth.uid) {
			this.context.router.push("/home");
		}
	}

	submitCredentials(event) {

		event.preventDefault();
		this.props.loginUser(this.state);
	}

	handleEmailChange(event) {
		this.setState({ email: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	render() {

		return(
			<form onSubmit={this.submitCredentials.bind(this)} className="login">
				<h2>Login</h2>
				<p>Provide a <strong>fake</strong> email and password and click Login.<br />
				   A profile <strong>will be created</strong> if you don't already have one.</p>
				<label htmlFor="email">Email: </label>
				<input 
					value={this.state.email}
					type="email" 
					name="email" 
					id="email"
					onChange={ this.handleEmailChange.bind(this) } />
				<label htmlFor="password">Password:</label>
				<input 
					value={this.state.password}
					type="password" 
					name="password" 
					id="password"
					onChange={ this.handlePasswordChange.bind(this) } /><br />
				<input type="submit" value="Login" className="btn btn-primary" />
			</form>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, {loginUser})(LoginForm);