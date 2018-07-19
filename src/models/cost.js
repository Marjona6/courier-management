const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

let costSchema;

export default costSchema = new mongoose.Schema({
	originalPrice: {type: Currency, min: 0},
	discountPercentage: {type: Number, min: 0, max: 100},
	discountAmount: {type: Currency, min: 0}
});