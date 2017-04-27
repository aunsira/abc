let should     = require('should');
let FormatText = require('../../lib/format_text')

let textTest = `nasdaqHomeIndexChart.storeIndexInfo("NASDAQ","6025.23","-0.26","0.00","2,106,220,858","6040.89","6021.72");
                nasdaqHomeIndexChart.storeIndexInfo("DJIA","20975.09","-21.03","0.10","","21070.90","20972.27");`;

describe('FormatText', function() {
  describe('extractIndexTable', function() {
    it('can extract index table data.', function(done) {
      foo = FormatText.extractIndexTable(textTest);
      foo[0].should.containEql('NASDAQ')
      done();
    });
  });

  describe('removeDoubleQuote', function() {
    it('can remove double quotes of string', function(done) {
      let doubleQuote = `"NASDAQ"`;
      foo = FormatText.removeDoubleQuote(doubleQuote);
      foo.should.eql("NASDAQ")
      done();
    });
  });

  describe('matchesNasdaqIndex', function() {
    it('can get stock name from index table', function(done) {
      foo = FormatText.matchesNasdaqIndex(FormatText.extractIndexTable(textTest));
      foo.should.eql("NASDAQ");
      done();
    });
  });

  describe('matchesNasdaqValue', function() {
    it('can get index value from index table', function(done) {
      foo = FormatText.matchesNasdaqValue(FormatText.extractIndexTable(textTest));
      foo.should.eql('6025.23');
      done();
    });
  });
});
