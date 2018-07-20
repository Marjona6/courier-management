const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4877;

const config = require('config');

const server = require('http').createServer(app);

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(cors({
	origin: (origin, cb) => {
		if (!origin) {
			return cb(new Error('Empty origin is not allowed!'));
		}
		const isDevEnv = origin == 'http://localhost:3000';
		if (isDevEnv) {
			cb(null, true);
		} else {
			cb(new Error(`Origin ${origin} is not allowed access!`));
		}
	},
	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	'preflightContinue': false
}));

require('./routes')(app);

if (config.util.getEnv('NODE_ENV') === 'test') {
	mongoose.connect(process.env.MONGO_TEST_URL);
}
else {
	mongoose.connect(process.env.MONGO_URL);
	app.use(morgan('combined'));
}

mongoose.connection
	.on('error', (err) => {
		console.error('Mongoose error', err);
	})
	.on('open', () => {
		console.log('Mongoose connected');
	});

server.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});

module.exports = app; // for testing