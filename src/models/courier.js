const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
	name: String,
	shipments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'}],
	// bundles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bundle'}], // this seems unnecessary at this point
});

let CourierModel;
export default CourierModel = mongoose.model('Courier', courierSchema);