global.__base = __dirname + '/../../';
let supertest = require('supertest');
let should = require('should');
let sinon = require('sinon');
let Stock = require('../../app/models/stock');

describe('Stock', function() {
  let tableName = 'stocks';
  let db;
  db = sinon.spy(function(table) {
    table.should.equal(tableName);
    return db;
  });

  describe('save', function() {
    it('save should try to insert', function(done) {
      new Stock().save('nasdaq').then(stock => {
        stock[0].name.should.eql('NASDAQ');
      });
      done();
    });
  });

  describe('findByName', function() {
    it('should select and fiter by name', function(done) {
      new Stock().findByName('nasdaq').then(stock => {
        stock[0].name.should.eql('NASDAQ');
      });
      done();
    });
  });

  describe('findAll', function() {
    it('should select all', function(done) {
      new Stock().findAll().then(stock => {
        stock.length.should.not.eql(0);
      });
      done();
    });
  });
});
