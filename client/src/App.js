import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
      buttons: [],
    };
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/dashboard' render={ (props) => (
            <div>
              <Header {...props} text="Management Dashboard"/>
              <List {...props} headings={this.state.managerHeadings} shipments={this.state.shipments}/>
            </div>
          )}/>
          <Route path='/todo' render={ (props) => (
            <div>
              <Header {...props} text="Courier To-Do Web Tool"/>
              <List {...props} headings={this.state.courierHeadings} shipments={this.state.shipments}/>
            </div>
          )}/>
          <Header text="Hello, World!"/>
          <List/>
        </Switch>
      </div>
    );
  }
}
