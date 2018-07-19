process.env.NODE_ENV = 'test';

import BundleModel from '../src/models/bundle';

const mongoose = require('mongoose');
// const Bundle = require('../src/models/bundle').default();


const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Bundles', () => {

	// empty test DB before each test
	beforeEach((done) => {
		BundleModel.remove({}, (err) => {
			done();
		});
	});

	// test: get a list of all bundles
	describe('GET /bundles', () => {
		it('should get a list of all bundles', (done) => {
			chai.request(server)
				.get('/bundles')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});
});
