const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
	shipments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'}]
});

let CourierModel;
export default CourierModel = mongoose.model('Courier', courierSchema);