import BundleModel from '../models/bundle';

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

		// create a bundle (not necessarily with courier)
		.post('/bundle/create', async (req, res) => {
			// a bundle is composed of shipments; pass in an array of shipments
			let shipments = [];
			BundleModel.create({

			})
		})

		// assign a bundle to a courier
		.post('/bundle/assign/:id/', async (req, res) => {
			let bundleDoc = await BundleModel.findByIdAndUpdate(req.params.id, 
				{courier: req.body.courier}, (err, result) => {
					if (err) {
						console.error(err);
					}
					res.status(200).json(result);
				}
			);
		})

		// add a discount to a bundle (amount)
		.post('/bundle/:id/discount/amount', async (req, res) => {
			// to do
		})

		// add a discount to a bundle (percentage)
		.post('/bundle/:id/discount/percentage', async (req, res) => {
			// to do
		})

		// get a list of a courier's bundles
		.get('/bundles/courier/:id', async (req, res) => {
			let courierBundleDocs = await BundleModel.find({'courier': req.params.id});
			res.status(200).json(courierBundleDocs);
		})

	// COURIER tasks
		// register a bundle as picked up
		.post('/bundle/:id/picked-up', async (req, res) => {

		})

		// register a bundle as delivered
		.post('/bundle/:id/delivered', async (req, res) => {
			
		})

		;
}
