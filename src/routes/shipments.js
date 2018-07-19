import ShipmentModel from '../models/shipment';

const mongoose = require('mongoose');
const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
	// MANAGER tasks
		// get a list of all shipments
		.get('/shipments', async (req, res) => {
			const shipmentDocs = await ShipmentModel.find({});
			res.status(200).json(shipmentDocs);
		})

		// add a discount to a shipment (amount)
		.post('/shipment/:id/discount/amount', async (req, res) => {
			// to do
		})

		// add a discount to a shipment (percentage)
		.post('/shipment/:id/discount/percentage', async (req, res) => {
			// to do
		})

	// COURIER tasks
		// get a list of a courier's shipments
		.get('/shipments/courier/:id', async (req, res) => {
			const courierShipmentDocs = await ShipmentModel.find({'courier': req.params.id});
			res.status(200).json(courierShipmentDocs);
		})

		// register a shipment as picked up
		.post('/shipment/:id/pickedup', async (req, res) => {
			// to do
		})

		// register a shipment as delivered
		.post('/shipment/:id/delivered', async (req, res) => {
			// to do
		})

		;
}
