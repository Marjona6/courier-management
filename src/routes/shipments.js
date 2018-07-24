import ShipmentModel from '../models/shipment';
import CourierModel from '../models/courier';
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

		// assign a shipment to a courier
		.put('/shipment/courier/assign/:id', async (req, res) => {
			let courier = req.body.courier; // make sure front end sends it this way
			ShipmentModel
				.findByIdAndUpdate(req.params.id, {$set: {courier: courier, status: 'ASSIGNED', assignedTimestamp: req.body.timestamp}})
				.then( async () => {
					let courierDoc = await CourierModel.findById(req.body.courier);
					let shipmentList = courierDoc.shipments;
					shipmentList.push(req.params.id);
					courierDoc.set({shipments: shipmentList});
					courierDoc.save();
				})
				.then( () => {
					return res.status(200).json({
						message: `Shipment with ID ${req.params.id} has been assigned to courier ${req.body.courier}.`
					});
				})
				.catch(err => {
					console.error(err);
					res.status(500).json({
						message: 'Internal server error'
					});
				});
		})

		// add a discount to a shipment (amount)
		.put('/shipment/:id/discount/amount', async (req, res) => {
			let updateAmount = req.body.discountAmount * 100; // make sure front end sends it this way
			let shipmentDoc = await ShipmentModel.findById(req.params.id);
			let newPrice = shipmentDoc.cost.currentPrice - updateAmount;
			if (newPrice < 0) {
				newPrice = 0;
			}
			shipmentDoc.cost.set({currentPrice: newPrice});
			shipmentDoc.save();
			return res.status(200).json({
				message: `Shipment with ID ${req.params.id} has been discounted by ${updateAmount}!`,
			});
		})

		// add a discount to a shipment (percentage)
		.put('/shipment/:id/discount/percentage', async (req, res) => {
			let updatePercentage = req.body.discountPercentage;
			let shipmentDoc = await ShipmentModel.findById(req.params.id);
			let newPrice = shipmentDoc.cost.currentPrice - (shipmentDoc.cost.currentPrice * updatePercentage / 100);
			shipmentDoc.cost.set({currentPrice: newPrice});
			shipmentDoc.save();
			return res.status(200).json({
				message: `Shipment with ID ${req.params.id} has been discounted by ${updatePercentage}%!`,
			});
		})

	// COURIER tasks
		// get a list of a courier's shipments
		.get('/shipments/courier/:id', async (req, res) => {
			const courierShipmentDocs = await ShipmentModel.find({'courier': req.params.id});
			res.status(200).json(courierShipmentDocs);
		})

		.get('/shipment/:id', async (req, res) => {
			const shipmentDoc = await ShipmentModel.findById(req.params.id);
			res.status(200).json(shipmentDoc);
		})

		// register a shipment as picked up
		.put('/shipment/:id/pickedup', async (req, res) => {
			ShipmentModel
				.findByIdAndUpdate(req.params.id, {$set: {status: 'PICKED_UP', pickedUpTimestamp: req.body.timestamp}})
				.then( () => {
					console.log(req.body);
					return res.status(200).json({
						message: `Shipment with ID ${req.params.id} has been picked up at ${req.body.timestamp}!`,
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
		// TODO: remove the shipment from the courier's queue?
		// need an extra data structure to hold delivered shipments that should still be linked to courier but not in active queue
		.put('/shipment/:id/delivered', async (req, res) => {
			ShipmentModel
				.findByIdAndUpdate(req.params.id, {$set: {status: 'DELIVERED', deliveredTimestamp: req.body.timestamp}})
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
				// courier: mongoose.Types.ObjectId('5b51abb66423f83a82678516'),
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

		// delete a shipment for dev/testing purposes only for now
		.delete('/shipment/delete/:id', (req, res) => {
			ShipmentModel
				.findByIdAndDelete(req.params.id)
				.then( () => {
					res.status(200).json({
						message: 'Shipment deleted.',
					});
				})
				.catch(error => {
					console.error(error);
				});
		})
		;
}
