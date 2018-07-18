const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

mongoose.connection
	.on('error', () => {
		console.error('Mongoose error');
	})
	.on('open', () => {
		console.log('Mongoose connected');
	});