import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import './dashboard.css';

import Header from './header';
import List from './list';

export default class Todo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shipments: [],
			isLoading: true,
			shipmentsListIsEmpty: false,
			buttons: [
				{
					text: 'Pick Up',
					type: 'pickup',
					description: '',
					handler: this.pickupShipment,
				},
				{
					text: 'Deliver',
					type: 'deliver',
					description: '',
					handler: this.deliverShipment,
				}
			],
		}
	}

	  getMyShipments() {
		    let userId = '5b51abb66423f83a82678516'; // only for demo purposes! will be gotten from session after user logs in in production version
		    axios.request({
		      method: 'GET',
		      url: config.SERVER_URL + '/shipments/courier/' + userId,
		    })
		    .then(response => {
		      this.setState({
		        shipments: response.data,
		        isLoading: false
		      });
		      if (response.data.length === 0) {
		      	this.setState({
		      		shipmentsListIsEmpty: true,
		      	});
		      }
		    })
		    .catch(error => {
		      console.error(error);
		    });
		}

	componentWillMount() {
		this.getMyShipments();
	}

	render() {
		return (
			<Route path='/todo' render={ (props) => (
	            <div>
	              	<Header {...props} text="Courier To-Do Web Tool"/>
	              	<List {...props}
	              		headings={this.props.headings}
	              		isDashboard={false}
	              		currentModal={this.state.currenModal}
	              		caption={'My Shipments'}
	              		shipments={this.state.shipments}
	              		buttons={this.state.buttons}
	              	/>
	            	{this.state.isLoading && <p>Loading...</p>}
	            	{this.state.shipmentsListIsEmpty && <p>No shipments found!</p>}
	            </div>
	        )}/>
		)
	}
}
