import React, { Component } from 'react';
import './shipment.css';

import Button from './button';
import Modal from 'react-modal';

export default class Shipment extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);

    this.state = {
      currentModal: null,
    }
  }

  

  onClick(event) {
    event.preventDefault();
    console.log(this);
  }

  toggleModal(val, event) {
    event.preventDefault();
    this.props.prepareToAssignShipment();
    console.log('toggling', this.state.currentmodal, event.target, val);
    if (this.state.currentModal) {
      this.handleModalCloseRequest();
      return;
    }
    // this.props.getCouriers(); // put this somewhere else!
    this.setState({
      currentModal: val,
    }, () => {
      console.log('state is now:', this.state, val);
    });
    // this.handleModalCloseRequest();
    // return;
  }
    
  handleModalCloseRequest(event) {
    this.setState({
      currentModal: null,
    }, () => {
      console.log('current state of modal:', this.state.currentModal);
    });
  }

	render() {
		return (
			<tr className={`shipment ${this.props.orderStatus}`}>
          <td>{this.props.shipment._id}</td>
          <td>{this.props.shipment.origin.streetAddress}</td>
          <td>{this.props.shipment.destination.streetAddress}</td>
          <td>{this.props.shipment.status}</td>
          <td>{(this.props.shipment.cost.currentPrice / 100).toFixed(2)}</td>
          {this.props.isDashboard && <td>{this.props.shipment.courier ? this.props.shipment.courier.name : ''}</td>}
          {this.props.buttons.map(button => {
            return (<td key={button.type}><Button text={button.text} type={button.type} onClick={this.toggleModal}/>
              <Modal
                id="test"
                title={button.text}
                ariaHideApp={false}
                contentLabel={button.text}
                isOpen={this.state.currentModal === button.type}
                onAfterOpen={this.onAfterOpen}
                onRequestClose={this.handleModalCloseRequest}
              >
                <h1>{button.text}</h1>
                <button onClick={this.handleModalCloseRequest}>Cancel</button>
                <div>{button.description}</div>
                <form>
                  {this.props.couriers && this.props.couriers.map(courier => {
                    return (<p key={courier._id}>Name: {courier.name} ID: {courier._id} Current number of shipments: {courier.shipments.length}
                      <button type="button" onClick={button.handler}>{button.text}</button></p>
                    )
                  })}
                </form>
              </Modal>
              </td>
            )
          })}
      		</tr>
		)
	}
}