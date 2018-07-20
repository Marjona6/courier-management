import ShipmentModel from '../models/shipment';
import addressSchema from '../models/address';
import costSchema from '../models/cost';

const mongoose = require('mongoose');
const faker = require('faker');
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
		.put('/shipment/:id/discount/amount', async (req, res) => {
			let updateAmount = req.body.amount; // make sure front end sends it this way
			ShipmentModel.findById(req.params.id, 'cost.originalPrice cost.currentPrice')
				.exec( (err, shipment) => {
					if (!shipment.cost.currentPrice) {
						// need to figure out whether discounts will be applied to current price or original price
					}
				})
			ShipmentModel
				.findByIdAndUpdate(req.params.id, {$set: updateObject})
				.then( () => {
					return res.status(200).json({
						message: `Shipment with ID ${req.params.id} has been picked up!`,
					});
				})
				.catch( (err) => {
					console.error(err);
					res.status(500).json({
						message: 'Internal server error',
					});
				});
			// to do
		})

		// add a discount to a shipment (percentage)
		.put('/shipment/:id/discount/percentage', async (req, res) => {
			// to do
		})

	// COURIER tasks
		// get a list of a courier's shipments
		.get('/shipments/courier/:id', async (req, res) => {
			const courierShipmentDocs = await ShipmentModel.find({'courier': req.params.id});
			res.status(200).json(courierShipmentDocs);
		})

		// register a shipment as picked up
		.put('/shipment/:id/pickedup', async (req, res) => {
			let updateObject = req.body;
			ShipmentModel
				.findByIdAndUpdate(req.params.id, {$set: updateObject})
				.then( () => {
					return res.status(200).json({
						message: `Shipment with ID ${req.params.id} has been picked up!`,
					});
				})
				.catch( (err) => {
					console.error(err);
					res.status(500).json({
						message: 'Internal server error',
					});
				});
		})

		// register a shipment as delivered
		.put('/shipment/:id/delivered', async (req, res) => {
			let updateObject = req.body;
			ShipmentModel
				.findByIdAndUpdate(req.params.id, {$set: updateObject})
				.then( () => {
					return res.status(200).json({
						message: `Shipment with ID ${req.params.id} has been delivered!`,
					});
				})
				.catch( (err) => {
					console.error(err);
					res.status(500).json({
						message: 'Internal server error',
					});
				});
		})

		// for creating test/example shipments for demo purposes
		.post('/shipment/new', async (req, res) => {
			function generatePercentage() {
				return Math.floor(Math.random() * 101);
			}

			function generateAmount() {
				return Math.floor(Math.random() * 20001) + 1;
			}
			let oPrice = generateAmount() + 20000;
			let dPercentage = generatePercentage();
			let dAmount = generateAmount();
			let cPrice = oPrice - ((oPrice * dPercentage) / 100) - dAmount;
			if (cPrice < 0) {
				cPrice = 0;
			}
			let cost = {
				_id: mongoose.Types.ObjectId(),
				originalPrice: oPrice,
				discountPercentage: dPercentage,
				discountAmount: dAmount,
				currentPrice: cPrice,
			} 
			let origin = {
				_id: mongoose.Types.ObjectId(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				companyName: faker.company.companyName(),
				streetAddress: faker.address.streetAddress(),
				postalCode: faker.address.zipCode(),
				city: faker.address.city(),
				country: faker.address.country(),
				email: faker.internet.email(),
				phone: faker.phone.phoneNumber()
			}
			let destination = {
				_id: mongoose.Types.ObjectId(),
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				companyName: faker.company.companyName(),
				streetAddress: faker.address.streetAddress(),
				postalCode: faker.address.zipCode(),
				city: faker.address.city(),
				country: faker.address.country(),
				email: faker.internet.email(),
				phone: faker.phone.phoneNumber()
			}
			let shipment = {
				origin: origin,
				destination: destination,
				status: 'WAITING',
				cost: cost,
			}
			await ShipmentModel.create(shipment, (err) => {
				if (err) {
					console.error(err);
					res.status(500).json({
						message: 'Internal server error; could not create shipment'
					});
				} else {
					res.status(200).json({
						message: 'New shipment created!'
					});
				}
			});
		})

		;
}
