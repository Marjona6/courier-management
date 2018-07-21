import React, { Component } from 'react';
import './button.css';

export default class Button extends Component {
	render() {
		return (
			<button type="button" onClick={this.props.handler} className={this.props.type}>
				{this.props.text}
			</button>
		)
	}
}