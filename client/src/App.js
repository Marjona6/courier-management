import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Header from './components/header';
import Dashboard from './components/dashboard';
import Todo from './components/todo';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      courierHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Pick Up', 'Deliver'],
      managerHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Assignee', 'Assign', 'Add Discount'],
    };
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div>
              <Header text="Select User Type"/>
              <Link to={'/dashboard'} className="user-selector">Manager</Link>
              <Link to={'/todo'} className="user-selector">Courier</Link>
            </div>
          </Route>
          <Route path='/dashboard' render={ (props) => (
            <Dashboard {...props} text="Management Dashboard" headings={this.state.managerHeadings} caption={'All Shipments'}/>
          )}/>
          <Route path='/todo' render={ (props) => (
            <Todo {...props} text="Courier To-Do Web Tool" headings={this.state.courierHeadings} caption={'My Shipments'}/>
          )}/>
        </Switch>
      </div>
    );
  }
}
