const mongoose = require('mongoose');

import addressSchema from './address';
import costSchema from './cost';

const shipmentSchema = new mongoose.Schema({
	origin: addressSchema,
	destination: addressSchema,
	courier: {type: mongoose.Schema.Types.ObjectId, ref: 'Courier'},
	status: String,
	assignedTimestamp: Date,
	pickedUpTimestamp: Date,
	deliveredTimestamp: Date,
	cost: costSchema
});

let ShipmentModel;
export default ShipmentModel = mongoose.model('Shipment', shipmentSchema);
