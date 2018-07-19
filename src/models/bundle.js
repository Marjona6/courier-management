const mongoose = require('mongoose');

const addressSchema = require('./address');
const costSchema = require('./cost');

const bundleSchema = new mongoose.Schema({
	// origin: addressSchema, // waiting to hear back about requirements
	// destination: addressSchema, // waiting to hear back about requirements
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
