global.__base = __dirname + '/../../';
let supertest = require('supertest');
let should = require('should');
let app = require('../../app.js').default;

var server = supertest.agent("http://localhost:3001");

describe('GET /api/indexes', function() {
  it('Can excess api endpoint.', function(done) {
    server
      .get('/api/indexes?name=nasdaq')
      .expect(200)
      .end(function(err, res) {
        done();
      });
  });

  it('Requires name of stock at endpoint.', function(done) {
    server
      .get('/api/indexes')
      .expect(400)
      .end(function(err, res) {
        done();
      });
  });

  it('Return bad request if query time are invalid.', function(done) {
    server
      .get('/api/indexes?name=nasdaq&from_time=4&to_time=0')
      .expect(400)
      .end(function(err, res) {
        done();
      });
  });

  it('Requires valid range of query time', function(done) {
    server
      .get('/api/indexes?name=nasdaq&from_time=0&to_time=4')
      .expect(400)
      .end(function(err, res) {
        done();
      });
  });

  it('Returns data correctly.', function(done) {
    server
      .get('/api/indexes?name=nasdaq')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.not.eql('');
        res.body.name.should.containEql('NASDAQ');
        done();
      });
  });
});
