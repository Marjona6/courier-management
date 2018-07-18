const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
	name: String,
	companyName: String,
	street: String,
	streetNumber: Number,
	postalCode: String,
	city: String,
	country: String,
	email: String,
	phone: String
});

const shipmentSchema = new mongoose.Schema({
	origin: addressSchema,
	destination: addressSchema,
	courier: {type: mongoose.Schema.Types.ObjectId, ref: 'Courier'},
	status: String,
	assignedTime: Date,
	pickedUpTime: Date,
	deliveredTime: Date,
	price: {type: Number, min: 0}
});

export default ShipmentModel = mongoose.model('Shipment', schema);