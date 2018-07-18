const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
	courier: {type: mongoose.Schema.Types.ObjectId, ref: 'Courier'},
	shipments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'}],
	status: String,
	assignedTime: Date,
	pickedUpTime: Date,
	deliveredTime: Date,
	price: {type: Number, min: 0}
});

export default bundleModel = mongoose.model('Bundle', schema);