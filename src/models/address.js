const mongoose = require('mongoose');

let addressSchema;

export default addressSchema = new mongoose.Schema({
	name: String,
	companyName: String,
	streetAddress: String,
	postalCode: String,
	city: String,
	country: String,
	email: String,
	phone: String
});
