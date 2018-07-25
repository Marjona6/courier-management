import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
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
	      url: config.SERVER_URL + '/shipments',
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
		await this.getCouriers();
		console.log('preparing to assign...');

	}

	assignShipment(event, id, courier) {		
	}

	discountShipment(event) {
	}

	async getCouriers() {
	    console.log('getting courier list...');
	    await axios.request({
	      method: 'GET',
	      url: config.SERVER_URL + '/couriers'
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
