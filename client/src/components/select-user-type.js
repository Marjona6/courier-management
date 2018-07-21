import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './select-user-type.css';

import Header from './header';

export default class SelectUserType extends Component {
	render() {
		return (
			<div>
				<Header text="Select User Type"/>
				<Link to={'/dashboard'}>Manager</Link>
				<Link to={'/todo'}>Courier</Link>
			</div>
		)
	}
}