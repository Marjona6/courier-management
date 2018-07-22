import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

import Header from './header';
import List from './list';

export default class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			shipments: [],
			isLoading: true,
		}
	}

	  getMyShipments() {
		    let userId = '5b51abb66423f83a82678516';
		    axios.request({
		      method: 'GET',
		      url: 'http://localhost:4877/shipments/courier/' + userId,
		    })
		    .then(response => {
		      console.log('response:', response);
		      this.setState({
		        shipments: response.data
		      }, () => {
		        console.log(this.state.shipment);
		      });
		    })
		    .catch(error => {
		      console.error(error);
		    });
		}

	componentWillMount() {
		console.log('getting my shipments...');
		this.getMyShipments();
	}

	render() {
		return (
			<Route path='/todo' render={ (props) => (
	            <div>
	              	<Header {...props} text="Courier To-Do Web Tool"/>
	              	<List {...props} headings={this.props.headings} caption={'My Shipments'} shipments={this.state.shipments}/>
	            	{this.state.isLoading && <p>Loading...</p>}
	            </div>
	        )}/>
		)
	}
}
