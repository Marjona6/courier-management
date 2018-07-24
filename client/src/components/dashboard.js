import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

import Header from './header';
import List from './list';

export default class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.prepareToAssignShipment = this.prepareToAssignShipment.bind(this);
		this.assignShipment = this.assignShipment.bind(this);

		this.state = {
			shipments: [],
			isLoading: true,
			couriers: [],
			currentModal: null,
			buttons: [
				{
					text: 'Assign',
					type: 'assign',
					description: 'Choose a courier to assign this shipment to.',
					handler: this.assignShipment,
				},
				{
					text: 'Discount',
					type: 'discount',
					description: 'Choose a type and amount of discount to apply to this shipment.',
					handler: this.discountShipment,
				}
			],
		}
	}

	getAllShipments() {
	    axios.request({
	      method: 'GET',
	      url: 'http://localhost:4877/shipments',
	    })
	    .then(response => {
	      this.setState({
	        shipments: response.data,
	        isLoading: false,
	      });
	    })
	    .catch(error => {
	      console.error(error);
	    });
	}

	async prepareToAssignShipment(event) {
		// event.preventDefault();
		await this.getCouriers();
		console.log('preparing to assign...');

	}

	assignShipment(event, id, courier) {
		// event.preventDefault();
		// axios.request({
	 //      method: 'PUT',
	 //      url: 'http://localhost:4877/shipment/courier/assign/' + id,
	 //      data: {timestamp: new Date(), courier: courier},
	 //    })
	 //    .then(response => {
	 //      this.updateShipmentForDisplay(id);
	 //    })
	 //    .catch(error => {
	 //      console.error(error);
	 //    });
		
	}

	discountShipment(event) {
		event.preventDefault();
		console.log('discounting shipment');
		// show a modal asking whether by amount or percentage and letting user input amount or percentage
		// axios request to apply the discount
		// update the data that is displayed (cost)
		// update the data displayed to courier(s)
	}

	async getCouriers() {
	    console.log('getting courier list...');
	    await axios.request({
	      method: 'GET',
	      url: 'http://localhost:4877/couriers'
	    })
	    .then(response => {
	      this.setState({
	        couriers: response.data
	      })
	    })
	    .catch(error => {
	      console.error(error);
	    });
	}

	componentWillMount() {
		console.log('getting all...');
		this.getAllShipments();
	}

	render() {
		return (
			<Route path='/dashboard' render={ (props) => (
	            <div>
	              	<Header {...props} text="Management Dashboard"/>
	              	<List {...props}
	              		headings={this.props.headings}
	              		isDashboard={true}
	              		currentModal={this.state.currentModal}
	              		caption={'All Shipments'}
	              		prepareToAssignShipment={this.prepareToAssignShipment}
	              		couriers={this.state.couriers} shipments={this.state.shipments}
	              		buttons={this.state.buttons}
	              	/>
	            	{this.state.isLoading && <p>Loading...</p>}
	            </div>
	        )}/>
		)
	}
}
