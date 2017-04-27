global.__base = __dirname + '/../../';
let supertest = require('supertest');
let should = require('should');
let sinon = require('sinon');
let Stock = require('../../app/models/stock');
let HistoricalStock = require('../../app/models/historical_stock');

describe('HistoricalStock', function() {
  describe('save', function() {
    it('save should try to insert', function(done) {
      new Stock().save('nasdaq').then(stock => {
        new HistoricalStock().save(stock[0].id, 234.53).then((rows) => {
          rows.length.should.eql(1);
        });
      }).then(() => {
        done();
      });
    });
  });

  describe('findByStockId', function() {
    it('should select and fiter by stock id', function(done) {
      options = {
        from_time: 0,
        to_time: new Date()/1000
      }
      new Stock().findByName('nasdaq').then(stock => {
        new HistoricalStock().findByStockId(stock[0].id, options).then((rows) => {
          rows.length.should.not.eql(0);
        });
      }).then(() => {
        done();
      });
    });
  });

  describe('findAll', function() {
    it('should select all', function(done) {
      new Stock().findByName('nasdaq').then(stock => {
        new HistoricalStock().findAll().then((rows) => {
          rows.length.should.not.eql(0);
        });
      }).then (() => {
        done();
      });
    });
  });
});
