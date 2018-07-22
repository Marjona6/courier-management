import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {

	constructor(props) {
		super(props);

		// this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: 'biker',
			password: 'biker',
		}
	}

	// onSubmit(event) {
	// 	event.preventDefault();
	// 	console.log('hi');
	// }

	render() {
		return (
			<div>
				<h2>Courier Login</h2>
				<form onSubmit={this.onSubmit}>
					<label>Username</label>
					<input value={this.state.username}></input>
					<label>Password</label>
					<input type="password" value={this.state.password}></input>
					<button type="submit">Log In</button>
				</form>
			</div>
		)
	}
}