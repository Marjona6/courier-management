import ShipmentModel from '../models/shipment';

const mongoose = require('mongoose');
const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
		// get a list of all shipments
		.get('/shipments', async (req, res) => {
			const shipmentDocs = await ShipmentModel.find({});
			res.json(shipmentDocs);
		})

		// add a discount to a shipment (amount)

		// add a discount to a shipment (percentage)

		// get a list of a courier's shipments
		.get('shipments/courier/:id', async (req, res) => {
			const courierShipmentDocs = await ShipmentModel.find({'courier': req.params.id});
			res.json(courierShipmentDocs);
		})

		// register a shipment as picked up

		// register a shipment as delivered

		;
}
