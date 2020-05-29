const request = require('supertest')
const app = require('../server/server')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
var expect = chai.expect;

describe('Getting events', () => {
    OK = 200
    initial_events_count = 12
    it('should get all events', async () => {
        const res = await request(app).get('/events')
        expect(res.statusCode).equal(OK)
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(initial_events_count);
    });
    it('should get event details', async () => {
        const res = await request(app).get('/events/1')
        expect(res.statusCode).equal(OK)
        expect(res.body).to.be.an('object');
      });
});

describe('Posting events', () => {
    it('should create new event', async () => {
        raw_event = {
            "topics": "",
            "thumbnail": "/img/tr-3.jpeg",
            "url": "index.html",
            "overrideURL": "",
            "linkType": "",
            "title": "Created by BV",
            "summary": "Lorem ipsum dolor sit amet"
        }

        created = 201
        const res = await request(app)
        .post('/events')
        .set('Content-Type', 'application/json')
        .send(raw_event);
        // console.log(res);
        expect(res.statusCode).equal(created);
    });
});


describe('Posting events', () => {
    it('should not create new event, the test might be invalid, as per the specs', async () => {
        bad_raw_event = {
            "topicsZ": "",
            "thumbnailZ": "/img/tr-3.jpeg",
            "urlZ": "index.html",
            "overrideURLZ": "",
            "linkTypeZ": "",
            "titleZ": "Created by BVz",
            "summaryZ": "Lorem ipsum dolor sit amet",
            "Z": "zzz"
        }

        created = 201
        const res = await request(app)
        .post('/events')
        .set('Content-Type', 'application/json')
        .send(bad_raw_event);
        console.log(res.body)
        expect(res.statusCode).not.equal(created);
    });
});

describe('Updating an event', () => {
    it('should accept the event update', async () => {
        updated_event = {
            "id": "1",
            "topics": "",
            "thumbnail": "/img/tr-3.jpeg",
            "url": "index.html",
            "overrideURL": "",
            "linkType": "",
            "title": "Updated by BV",
            "summary": "Lorem ipsum dolor sit amet"
        }

        OK = 200
        const res = await request(app)
        .put('/events/1')
        .set('Content-Type', 'application/json')
        .send(updated_event);
        console.log(res.body)
        expect(res.statusCode).equal(OK);
    })

    it('should give an error', async () => {
        updated_event = {
            "id": "1001",
            "topics": "",
            "thumbnail": "/img/tr-3.jpeg",
            "url": "index.html",
            "overrideURL": "",
            "linkType": "",
            "title": "Updated by BV",
            "summary": "Lorem ipsum dolor sit amet"
        }

        OK = 200
        const res = await request(app)
        .put('/events/1001')
        .set('Content-Type', 'application/json')
        .send(updated_event);
        console.log(res.body)
        expect(res.body).to.deep.equal({ 'error': 'Id not found' })
        expect(res.statusCode).not.equal(OK);
    })
})

describe('Deleting an event', () => {
    it('should delete the event ', async () => {
        OK = 200
        const res = await request(app)
        .delete('/events/1');
        expect(res.statusCode).equal(OK);
    })

    it('should should give an error ', async () => {
        OK = 200
        const res = await request(app)
        .delete('/events/2002');
        expect(res.statusCode).not.equal(OK);
    })
})
