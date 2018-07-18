require('dotenv').config();
require('./mongoose');

const express = require('express');

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 4877;

const routes = require('./routes');

app.use('/', routes);

server.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});