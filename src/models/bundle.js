const mongoose = require('mongoose');

const addressSchema = require('./address');
const costSchema = require('./cost');

const bundleSchema = new mongoose.Schema({
	origin: addressSchema,
	destination: addressSchema,
	courier: {type: mongoose.Schema.Types.ObjectId, ref: 'Courier'},
	shipments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'}],
	status: String,
	assignedTimestamp: Date,
	pickedUpTimestamp: Date,
	deliveredTimestamp: Date,
	cost: costSchema
});

let BundleModel;
export default BundleModel = mongoose.model('Bundle', bundleSchema);
