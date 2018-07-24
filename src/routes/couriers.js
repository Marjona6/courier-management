import CourierModel from '../models/courier';

const mongoose = require('mongoose');
const faker = require('faker');
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

		// get a courier by ID
		.get('/courier/:id', async (req, res) => {
			const courierDoc = await CourierModel.findById(req.params.id);
			res.status(200).json(courierDoc);
		})

		// for creating test/example couriers for demo purposes
		.post('/courier/new', async (req, res) => {
			let courier = {
				name: faker.name.firstName(),
				shipments: [],
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

		// for demo/test/dev purposes only right now
		.put('/courier/update/:id', async (req, res) => {
			CourierModel
				.findByIdAndUpdate(req.params.id, {$set: {name: faker.name.firstName()}})
				.then(() => {
					res.status(200).json({
						message: 'Name added!'
					});
				})
				.catch(error => {
					console.log(error);
				});
		})
		;
}

