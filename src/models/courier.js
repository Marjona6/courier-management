const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
	shipments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'}]
});

export default CourierModel = mongoose.model('Courier', schema);