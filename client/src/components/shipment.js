import React, { Component } from 'react';
import './shipment.css';

import Button from './button';

export default class Shipment extends Component {
	render() {
		return (
			<tr className={`shipment ${this.props.orderStatus}`}>
  				<td>1984</td>
  				<td>1972</td>
  				<td>2003</td>
  				<td>1865</td>
  				<Button buttonText="Click Me" buttonType="deliver"/> 
      		</tr>
		)
	}
}