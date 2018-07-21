import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import SelectUserType from './components/select-user-type';
import Header from './components/header';
import List from './components/list';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      courierHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Pick Up', 'Deliver'],
      managerHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Assignee', 'Assign', 'Add Discount'],
      allShipments: [],
      myShipments: [],
      buttons: [], // do I need this?
    };
  }

  getAllShipments() {
    axios.request({
      method: 'GET',
      url: 'http://localhost:4877/shipments',
    })
    .then(response => {
      console.log('response:', response);
      this.setState({
        allShipments: response.data
      }, () => {
        console.log(this.state.allShipments);
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  getMyShipments() {
    let userId = '555555555555';
    axios.request({
      method: 'GET',
      url: 'http://localhost:4877/shipments/courier/' + userId,
    })
    .then(response => {
      console.log('response:', response);
      this.setState({
        allShipments: response.data
      }, () => {
        console.log(this.state.allShipments);
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  componentDidMount() {
    console.log('mounted');
    // this.setStateWithShipments(this.getShipments());
    this.getAllShipments();

  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/dashboard' render={ (props) => (
            <div>
              <Header {...props} text="Management Dashboard"/>
              <List {...props} headings={this.state.managerHeadings} caption={'All Shipments'} shipments={this.state.allShipments}/>
            </div>
          )}/>
          <Route path='/todo' render={ (props) => (
            <div>
              <Header {...props} text="Courier To-Do Web Tool"/>
              <List {...props} headings={this.state.courierHeadings} caption={'My Shipments'} shipments={this.state.myShipments}/>
            </div>
          )}/>
          <Route path='*' component={SelectUserType}/>
        </Switch>
      </div>
    );
  }
}
