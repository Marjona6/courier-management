import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import Dashboard from './components/dashboard';
import Login from './components/login';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      courierHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Pick Up', 'Deliver'],
      managerHeadings: ['ID', 'Origin', 'Destination', 'Order Status', 'Delivery Cost', 'Assignee', 'Assign', 'Add Discount'],
      isAuthenticated: false,
      username: 'biker',
      password: 'biker',
    };
  }

    onSubmit(event) {
      event.preventDefault();
      console.log('submitting...');
      if (this.state.username === 'biker' && this.state.password === 'biker') {
        this.setState({
          isAuthenticated: true
        });
      }
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
          <Route path='/login' component={Login}/>
          <Route path='/todo' render={ ({ component: Component, ...rest }) => (
            <Route {...rest} render ={(props) => (
              this.state.isAuthenticated === true
                ? <Component {...props}/>
                : <Redirect to={{
                  pathname: '/login',
                  props: { onSubmit: this.state.onSubmit, username: 'hello', password: this.state.password }
                }}/>
              )} text="Courier To-Do Web Tool" headings={this.state.courierHeadings} caption={'My Shipments'}/>
          )}/>
        </Switch>
      </div>
    );
  }
}
