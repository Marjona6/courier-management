import BundleModel from '../models/bundle';
import ShipmentModel from '../models/shipment';
import CourierModel from '../models/courier';
import addressSchema from '../models/address';
import costSchema from '../models/cost';

const mongoose = require('mongoose');
const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
	// MANAGER tasks
		// get a list of all bundles
		.get('/bundles', async (req, res) => {
			let bundleDocs = await BundleModel.find({});
			res.status(200).json(bundleDocs);
		})

		// get a bundle by ID
		.get('/bundle/:id', async (req, res) => {
			let bundleDoc = await BundleModel.findById(req.params.id);
			res.status(200).json(bundleDoc);
		})

		// create a bundle (not necessarily with courier)
		// at some point either front or back, need to validate to make sure that...
		// .. bundled shipments have status of 'WAITING'
		// (possibly also 'PICKED_UP' if they have all been picked up by same courier?)
		// another todo: add a 'bundleCreatedTimestamp' and add to model and also add here
		.post('/bundle/create', async (req, res) => {
			// a bundle is composed of shipments; pass in an array of shipments IDs
			// create the bundle document itself
			let newBundle = new BundleModel({
				// may need to make sure each shipment ID is in the form of a mongoose.Types.ObjectId?
				shipments: req.body.shipments, // the shipments can be accessed via their refs
			});
			// update each shipment with the bundle ID
			req.body.shipments.map(async shipment => {
				let shipmentDoc = await ShipmentModel.findByIdAndUpdate(shipment, {$set: {bundle: mongoose.Types.ObjectId(newBundle._id)}});
			});
			newBundle.save();
			res.status(200).json({
				message: 'Bundle created!'
			});
		})


		// assign a bundle to a courier
		.put('/bundle/assign/:id/', async (req, res) => {
			BundleModel
				// update the bundle document with the assigned courier and associated data
				// note: make sure to pass in a timestamp here from front!
				.findByIdAndUpdate(req.params.id, {$set: {courier: req.body.courier, status: 'ASSIGNED', assignedTimestamp: req.body.timestamp}})
				// update the courier document with the assigned bundle
				.then( async () => {
					let courierDoc = await CourierModel.findById(req.body.courier);
					let shipmentList = courierDoc.shipments; // courier's current shipments before bundled is added
					let bundleDoc = await BundleModel.findById(req.params.id);
					let bundleShipments = bundleDoc.shipments;
					bundleShipments.map(async shipment => {
						// add each shipment in the bundle to the list of courier's total shipments
						shipmentList.push(mongoose.Types.ObjectId(shipment));
						// update each shipment with the bundle ID so the front end can group shipments appropriately
						await ShipmentModel.findByIdAndUpdate(shipment, {$set: {bundle: mongoose.Types.ObjectId(req.params.id)}});
					});
					courierDoc.set({shipments: shipmentList});
					courierDoc.save();
					res.status(200).json({
						message: 'Bundle assigned to courier!'
					});
				})
				.catch(err => {
					console.error(err);
					res.status(500).json({
						message: 'Internal server error'
					});
				});
		})

		// add a discount to a bundle (amount)
		.put('/bundle/:id/discount/amount', async (req, res) => {
			// assuming that when a bundle is discounted by an amount, the amount is deducted from each individual shipment
			// there could be alternative ways to calculate this; e.g., divide the discount with an equal amount per shipment...
			// ... or proportional to the cost of each shipment
			let updateAmount = req.body.discountAmount * 100;
			// get an array of shipment IDs from the bundle ID
			let bundleToDiscount = await BundleModel.findById(req.params.id);
			// map over the array of shipments and perform the discount logic on each shipment
			bundleToDiscount.shipments.map(async shipment => {
				// get the document for the shipment ID
				let shipmentDoc = await ShipmentModel.findById(shipment);
				let newPrice = shipmentDoc.cost.currentPrice - updateAmount;
				if (newPrice < 0) {
					newPrice = 0;
				}
				shipmentDoc.cost.set({currentPrice: newPrice});
				shipmentDoc.save();
			});
			res.status(200).json({
				message: 'Bundle discounted by an amount!'
			});
		})

		// add a discount to a bundle (percentage)
		.put('/bundle/:id/discount/percentage', async (req, res) => {
			// applying the same percentage discount to each shipment in the bundle
			let updatePercentage = req.body.discountPercentage;
			// get an array of shipment IDs from the bundle ID
			let bundleToDiscount = await BundleModel.findById(req.params.id);
			// map over the array of shipments and perform the discount logic on each shipment
			bundleToDiscount.shipments.map(async shipment => {
				// get the document for the shipment ID
				let shipmentDoc = await ShipmentModel.findById(shipment);
				let newPrice = shipmentDoc.cost.currentPrice - (shipmentDoc.cost.currentPrice * updatePercentage / 100);
				shipmentDoc.cost.set({currentPrice: newPrice});
				shipmentDoc.save();
			});
			res.status(200).json({
				message: 'Bundle discounted by a percentage!'
			});
		})

		// get a list of a courier's bundles
		.get('/bundles/courier/:id', async (req, res) => {
			let courierBundleDocs = await BundleModel.find({'courier': req.params.id});
			res.status(200).json(courierBundleDocs);
		})

	// COURIER tasks
	// TODO!
		// register a bundle as picked up
		.put('/bundle/:id/picked-up', async (req, res) => {

		})

		// register a bundle as delivered
		.put('/bundle/:id/delivered', async (req, res) => {
			
		})

		;
}
