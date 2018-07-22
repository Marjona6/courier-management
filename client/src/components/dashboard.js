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

	getAllShipments() {
	    axios.request({
	      method: 'GET',
	      url: 'http://localhost:4877/shipments',
	    })
	    .then(response => {
	      console.log('response:', response);
	      this.setState({
	        shipments: response.data,
	        isLoading: false,
	      }, () => {
	        console.log(this.state.shipments);
	      });
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
	              	<List {...props} headings={this.props.headings} caption={'All Shipments'} shipments={this.state.shipments}/>
	            	{this.state.isLoading && <p>Loading...</p>}
	            </div>
	        )}/>
		)
	}
}
