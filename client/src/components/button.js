import React, { Component } from 'react';
import './button.css';

export default class Button extends Component {
	render() {
		return (
			<button type="button" onClick={e => this.props.onClick(e, this.props.type, this.props.shipmentId)} className={this.props.type}>
				{this.props.text}
			</button>
		)
	}
}