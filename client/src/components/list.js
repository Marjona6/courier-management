import React, { Component } from 'react';
import './list.css';

import Shipment from './shipment';

export default class List extends Component {
  render() {
    return (
      <div className="list">
      	<table>
      		<caption>A list of shipments.</caption>
      		<thead>
      			<tr>
      				{this.props.headings.map(heading => {
      					return <th scope="col" key={heading}>{heading}</th>
      				})}
      			</tr>
      		</thead>
      		<tbody>
      			{this.props.shipments.map(shipment => {
      				return <Shipment key={shipment.id} orderStatus={shipment.orderStatus}/>
      			})}
      			<Shipment orderStatus='to-be-picked-up'/>
      			<Shipment orderStatus='to-be-delivered'/>
      		</tbody>
      	</table>
      </div>
    );
  }
}
