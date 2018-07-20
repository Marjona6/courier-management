import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Header from './components/header';
import List from './components/list';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      courierHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost'],
      managerHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Assignee'],
      shipments: [],
      buttons: [], // do I need this?
    };
  }

  async getShipments() {
    const res = await axios.request({
      method: 'GET',
      url: 'http://localhost:4877/shipments',
    });
    return await res.json();
  }

  async setStateWithShipments(shipments) {
    await this.setState({
      shipments: shipments
    }, () => {
      console.log(this.state.shipments);
    });
  }

  componentDidMount() {
    console.log('mounted');
    // this.setStateWithShipments(this.getShipments());
    axios.request({
      method: 'GET',
      url: 'http://localhost:4877/shipments',
    })
    .then(response => {
      console.log('response:', response);
      this.setState({
        shipments: response.data
      }, () => {
        console.log(this.state.shipments);
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/dashboard' render={ (props) => (
            <div>
              <Header {...props} text="Management Dashboard"/>
              <List {...props} headings={this.state.managerHeadings} caption={'All Shipments'} shipments={this.state.shipments}/>
            </div>
          )}/>
          <Route path='/todo' render={ (props) => (
            <div>
              <Header {...props} text="Courier To-Do Web Tool"/>
              <List {...props} headings={this.state.courierHeadings} caption={'My Shipments'} shipments={this.state.shipments}/>
            </div>
          )}/>
          <Header text="Hello, World!"/>
          <List/>
        </Switch>
      </div>
    );
  }
}
