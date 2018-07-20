process.env.NODE_ENV = 'test';

import ShipmentModel from '../src/models/shipment';
import CourierModel from '../src/models/courier';

const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

// functions needed for creating fake data for tests
function generateAddress() {

}

function generateCost() {
	let oPrice = generateAmount() + 20000;
	let dPercentage = generatePercentage();
	let dAmount = generateAmount();
	let cPrice = oPrice - ((oPrice * dPercentage) / 100) - dAmount;
	if (cPrice < 0) {
		cPrice = 0;
	}
	return {
		_id: mongoose.Types.ObjectId(),
		originalPrice: oPrice,
		discountPercentage: dPercentage,
		discountAmount: dAmount,
		currentPrice: cPrice,
	} 
}

// not sure about these 2 below--which do I really need?
function generateCourierId() {
	return {
		_id: mongoose.Types.ObjectId();
	}
}

function generateCourier() {
	return {
		_id: id,
		shipments: [generateShipment(), generateShipment(), generateShipment()],
	}
}

function generateOrderStatus() {
	let statuses = ['WAITING', 'ASSIGNED', 'PICKED_UP', 'DELIVERED'];
	return statuses[Math.floor(Math.random() * statuses.length)];
}

function generatePercentage() {
	return Math.floor(Math.random() * 101);
}

function generateAmount() {
	return Math.floor(Math.random() * 20001) + 1;
}

function generateShipment(courier) {
	if (!courier) {
		let courier = generateCourierId()._id;
	}
	return {
		_id: mongoose.Types.ObjectId(),
		origin: generateAddress(),
		destination: generateAddress(),
		courier: courier,
		status: generateOrderStatus(),
		assignedTimestamp: faker.date.past(),
		deliveredTimestamp: faker.date.past(),
		cost: generateCost(),
	}
}

describe('Shipments', () => {

	// empty test DB before each test
	beforeEach((done) => {
		ShipmentModel.remove({}, (err) => {
			done();
		});
	});

	// TESTS: MANAGER tasks

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

	// test: add a discount to a shipment (amount)
	describe('POST /shipment/:id/discount/amount', () => {

	});

	// test: add a discount to a shipment (percentage)
	describe('POST /shipment/:id/discount/percentage', () => {

	});

	// TESTS: COURIER tasks

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

	// test: register a shipment as picked up
	describe('POST /shipment/:id/pickedup', () => {

	});

	// test: register a shipment as delivered
	describe('POST /shipment/:id/delivered', () => {

	});
});
