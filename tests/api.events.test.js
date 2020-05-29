const request = require('supertest')
const app = require('../server/server')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
var expect = chai.expect;

describe('Getting events', () => {
    it('should get all events', async () => {
        const res = await request(app).get('/events')
        expect(res.statusCode).equal(200)
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(12);
        // console.log(res);
    });
    it('should get event details', async () => {
        const res = await request(app).get('/events/1')
        expect(res.statusCode).equal(200)
        expect(res.body).to.be.an('object');
      });
  })

//   describe('Posting events', () => {
    //   it('should post a well formatted event')
//   })