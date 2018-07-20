import CourierModel from '../models/courier';

const mongoose = require('mongoose');
const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
	// MANAGER tasks
		// get a list of all couriers (for assigning shipments to couriers)
		.get('/couriers', async (req, res) => {
			const courierDocs = await CourierModel.find({});
			res.status(200).json(courierDocs);
		})

		// for creating test/example couriers for demo purposes
		.post('/courier/new', async (req, res) => {
			let courier = {
				shipments: []
			}
			await CourierModel.create(courier, (err) => {
				if (err) {
					res.status(500).json({
						message: 'Internal server error; could not create courier'
					});
				} else {
					res.status(200).json({
						message: 'New courier created!'
					});
				}
			});
		})
		;
}

