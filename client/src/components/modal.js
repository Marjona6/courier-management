import React, { Component } from 'react';
import Modal from 'react-modal';

export default class CoolModal extends Component {
	render() {
		console.log('modaling');
		return (
			<Modal
				id="test"
				contentLabel="modal"
				isOpen={this.props.isOpen}
				onAfterOpen={this.onAfterOpen}
				onRequestClose={this.onRequestClose}>
				<h1>{this.props.title}</h1>
				<button onClick={this.askToClose}>close</button>
				<div>Modal info here</div>
				<form>
					<input onChange={this.onInputChange}/>
					<input/>
					<button>Button A</button>
				</form>
			</Modal>
		);
	}
}