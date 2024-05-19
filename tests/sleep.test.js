const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server'); // Adjust path if needed

describe('Sleep Tracker API', () => {
  // Replace with a valid user ID for GET/DELETE tests
  const userId = 1;

  describe('POST /sleep', () => {
    it('creates a new sleep record', (done) => {
      const newRecord = {
        userId: 1,
        hours: 8,
        timestamp: new Date().toISOString(),
      };
      chai.request(app)
        .post('/sleep')
        .send(newRecord)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body).to.deep.include(newRecord);
        })
        .end(done);
    });

    it('returns 400 for missing data', (done) => {
      chai.request(app)
        .post('/sleep')
        .send({}) // Empty object
        .expect(400)
        .expect((res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Missing required fields');
        })
        .end(done);
    });
  });

  describe('GET /sleep/:userId', () => {
    it('retrieves sleep records for a user', (done) => {
      chai.request(app)
        .get(`/sleep/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an('array');
        })
        .end(done);
    });
  });

  describe('DELETE /sleep/:recordId', () => {
    let recordId;

    // Assuming a successful POST is done before DELETE test
    beforeEach((done) => {
      const newRecord = {
        userId: 1,
        hours: 7,
        timestamp: new Date().toISOString(),
      };
      chai.request(app)
        .post('/sleep')
        .send(newRecord)
        .end((err, res) => {
          recordId = res.body.id;
          done();
        });
    });

    it('deletes a sleep record', (done) => {
      chai.request(app)
        .delete(`/sleep/${recordId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Record deleted');
        })
        .end(done);
    });

    it('returns 404 for non-existent record', (done) => {
      chai.request(app)
        .delete('/sleep/12345') // Non-existent ID
        .expect(404)
        .expect((res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Record not found');
        })
        .end(done);
    });
  });
});
