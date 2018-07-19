import BundleModel from '../models/bundle';

const mongoose = require('mongoose');
const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
		// get a list of all bundles
		.get('/bundles', async (req, res) => {
			const bundleDocs = await BundleModel.find({});
			res.status(200).json(bundleDocs);
		})

		// create a bundle
		.post('/bundle/create', async (req, res) => {

		})

		// add a discount to a bundle (amount)

		// add a discount to a bundle (percentage)

		// get a list of a courier's bundles
		.get('/bundles/courier/:id', async (req, res) => {
			const courierBundleDocs = await BundleModel.find({'courier': req.params.id});
			res.status(200).json(courierBundleDocs);
		})

		// register a bundle as picked up

		// register a bundle as delivered

		;
}
