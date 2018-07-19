process.env.NODE_ENV = 'test';

import ShipmentModel from '../src/models/shipment';
import CourierModel from '../src/models/courier';

const mongoose = require('mongoose');
// const Bundle = require('../src/models/bundle').default();


const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Shipments', () => {

	// // start server
	// before((done) => {
	// 	server.runServer('url')
	// 		.then(console.log('running server'))
	// 		.catch(err => console.log({err}))
	// });

	// empty test DB before each test
	beforeEach((done) => {
		ShipmentModel.remove({}, (err) => {
			done();
		});
	});

	// test: get a list of all bundles
	describe('GET /shipments', () => {
		it('should get a list of all shipments', (done) => {
			chai.request(server)
				.get('/shipments')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	// test: get a list of courier's shipments
	describe('GET /shipments/courier/:id', () => {
		it('should get a list of all shipments for a courier, by courier ID', (done) => {
			let courier = new CourierModel({ _id: mongoose.Types.ObjectId() });
			courier.save((err, courier) => {
				console.log(courier); //
				chai.request(server)
					.get('/shipments/courier/' + courier._id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						done();
					});
			});
		});
	});
});
