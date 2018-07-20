import React, { Component } from 'react';
import './button.css';

export default class Button extends Component {
	render() {
		return (
			<button type="button" className={this.props.buttonType}>
				{this.props.buttonText}
			</button>
		)
	}
}