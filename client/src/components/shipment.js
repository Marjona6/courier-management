import React, { Component } from 'react';
import axios from 'axios';
import './shipment.css';

import Button from './button';
import Modal from 'react-modal';

export default class Shipment extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
    this.updateShipmentForDisplay = this.updateShipmentForDisplay.bind(this);
    this.assignShipment = this.assignShipment.bind(this);
    this.discountShipment = this.discountShipment.bind(this);
    this.pickUpShipment = this.pickUpShipment.bind(this);
    this.deliverShipment = this.deliverShipment.bind(this);
    this.selectDiscountType = this.selectDiscountType.bind(this);
    this.handlePercentageDiscount = this.handlePercentageDiscount.bind(this);
    this.handleAmountDiscount = this.handleAmountDiscount.bind(this);

    this.state = {
      currentModal: null,
      // isPickedUp: false,
      // isDelivered: false,
      shipment: this.props.shipment,

    }
  }

  updateShipmentForDisplay(id) {
    console.log('updating shipment for display');
    axios.request({
      method: 'GET',
      url: 'http://localhost:4877/shipment/' + id,
    })
    .then(response => {
      console.log(response);
      this.setState({
        shipment: response.data,
      })
    })
    .catch(error => {
      console.error(error);
    });
  }

  assignShipment(event, id, courier) {
    console.log(id, courier);
    // need to get courier id--manager selects from a list of all couriers
    axios.request({
      method: 'PUT',
      url: 'http://localhost:4877/shipment/courier/assign/' + id,
      data: {timestamp: new Date(), courier: courier},
    })
    .then(response => {
      this.updateShipmentForDisplay(id);
      this.toggleModal(event, 'assign');
    })
    .catch(error => {
      console.error(error);
    });
  }

  discountShipment(event, id) {
    console.log('discounting...', this.state.discountType);
    if (!this.state.amountDiscount && !this.state.percentageDiscount) {
      alert('Please enter either a percentage or an amount for the discount.');
    }
    if (!this.state.discountType) {
      alert('Please select a discount type!');
    }
    else if (this.state.discountType === 'percentage') {
      axios.request({
        method: 'PUT',
        url: 'http://localhost:4877/shipment/' + id + '/discount/percentage',
        data: { discountPercentage: this.state.percentageDiscount },
      })
      .then(response => {
        this.updateShipmentForDisplay(id);
        this.toggleModal(event, 'discount');
      })
      .catch(error => {
        console.error(error);
      })
    }
    else if (this.state.discountType === 'amount') {
      axios.request({
        method: 'PUT',
        url: 'http://localhost:4877/shipment/' + id + '/discount/amount',
        data: { discountAmount: this.state.amountDiscount },
      })
      .then(response => {
        this.updateShipmentForDisplay(id);
        this.toggleModal(event, 'discount');
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  pickUpShipment(id) {
    // register pickup timestamp and order status change
    axios.request({
      method: 'PUT',
      url: 'http://localhost:4877/shipment/' + id + '/pickedup',
      data: {timestamp: new Date()},
    })
    .then(response => {
      this.updateShipmentForDisplay(id);
      this.setState({
        isPickedUp: true,
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  deliverShipment(id) {
    // register delivery timestamp and order status change
    axios.request({
      method: 'PUT',
      url: 'http://localhost:4877/shipment/' + id + '/delivered',
      data: {timestamp: new Date()},
    })
    .then(response => {
      this.updateShipmentForDisplay(id);
      this.setState({
        isDelivered: true,
      });
    })
    .catch(error => {
      console.error(error);
    });

  }

  onClick(event, val, id) {
    event.preventDefault();
    // for manager dashboard
    if (this.props.isDashboard) {
      this.toggleModal(event, val);
    }
    else {
      // for courier to-do tool
      if (event.target.className === 'pickup') {
        this.pickUpShipment(id);
      }
      else if (event.target.className === 'deliver') {
        this.deliverShipment(id);
      }
    }
  }

  toggleModal(event, val) {
    event.preventDefault();
    if (this.props.isDashboard) {
      this.props.prepareToAssignShipment(); // not needed for discount
    }
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
  }
    
  handleModalCloseRequest(event) {
    this.setState({
      currentModal: null,
    }, () => {
      console.log('current state of modal:', this.state.currentModal);
    });
  }

  selectDiscountType(event) {
    this.setState({
      discountType: event.target.value,
    });
  }

  handlePercentageDiscount(event) {
    this.setState({
      percentageDiscount: event.target.value,
    });
  }

  handleAmountDiscount(event) {
    this.setState({
      amountDiscount: event.target.value,
    });
  }

	render() {
		return (
			<tr className={`shipment ${this.state.shipment.status}`}>
          <td>{this.state.shipment._id}</td>
          <td>{this.state.shipment.origin.streetAddress}</td>
          <td>{this.state.shipment.destination.streetAddress}</td>
          <td>{this.state.shipment.status}</td>
          <td>{(this.state.shipment.cost.currentPrice / 100).toFixed(2)}</td>
          {this.props.isDashboard && <td>{this.state.shipment.courier ? this.state.shipment.courier : ''}</td>}
          {this.props.buttons.map(button => {
            return ((button.type === 'pickup') && (this.state.shipment.pickedUpTimestamp)) && <td key={button.type}>{this.state.shipment.pickedUpTimestamp ? this.state.shipment.pickedUpTimestamp.toString() : ''}</td>
          })}
          {this.props.buttons.map(button => {
            return ((button.type === 'deliver') && (this.state.shipment.deliveredTimestamp)) && <td key={button.type}>{this.state.shipment.deliveredTimestamp ? this.state.shipment.deliveredTimestamp.toString() : ''}</td>
          })}
          {this.props.buttons.map(button => {
            return ((button.type === 'assign') && (this.state.shipment.assignedTimestamp)) && <td key={button.type}>{this.state.shipment.assignedTimestamp ? this.state.shipment.assignedTimestamp.toString() : ''}</td>
          })}
          {this.props.buttons.map(button => {
            return (
            (((button.type === 'pickup') && !this.state.shipment.pickedUpTimestamp) ||
              ((button.type === 'deliver') && !this.state.shipment.deliveredTimestamp) ||
              ((button.type === 'assign') && (this.state.shipment.status === 'WAITING')) ||
              ((button.type === 'discount') && (this.state.shipment.status !== 'DELIVERED')))
                && <td key={button.type}><Button text={button.text} type={button.type} shipmentId={this.state.shipment._id} onClick={this.onClick}/>
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
                    return (
                      <div key={button.text}>
                        {button.type === "assign" && <p key={courier._id}>Name: {courier.name} ID: {courier._id} Current number of shipments: {courier.shipments.length}</p>}
                        {button.type === "discount" && (
                          <div>
                            <legend>Discount Type</legend>
                            <input type="radio" value="percentage" checked={this.state.discountType === 'percentage'} onChange={this.selectDiscountType}/><label>Percentage</label><input onChange={e => this.handlePercentageDiscount(e)} type="number"/>
                            <input type="radio" value="amount" checked={this.state.discountType === 'amount'} onChange={this.selectDiscountType}/><label>Amount</label><input onChange={e => this.handleAmountDiscount(e)} type="number"/>
                          </div>
                          )
                        }
                        {button.type === "assign" && <button type="button" onClick={e => {this.assignShipment(e, this.state.shipment._id, courier._id)}}>{button.text}</button>}
                        {button.type === "discount" && <button type="button" onClick={e => {this.discountShipment(e, this.state.shipment._id)}}>{button.text}</button>}
                      </div>)
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