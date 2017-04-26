let gulp            = require('gulp');
let gulpUtil        = require('gulp-util');
let request         = require('request');
var fs              = require('fs');
var cheerio         = require('cheerio');

var Stock           = require('./app/models/stock');
var HistoricalStock = require('./app/models/historical_stock');

var formatText      = require('./lib/format_text')

gulp.task('scrape', () => {

  url = 'http://www.nasdaq.com/';

  let scrape = () => {
    request(url, function(error, response, html){
      if (!error) {
        var $ = cheerio.load(html);
        var stock = { name: "", value: 0.0 };

        $('#indexTable').filter(function() {
          var data = $(this);
          var indexTable = formatText.extractIndexTable(data.text());

          stock.name = formatText.matchesNasdaqIndex(indexTable);
          stock.value = formatText.matchesNasdaqValue(indexTable);
        });
      }

      stockObj = new Stock();

      stockObj.save(stock.name).then(stockModel => {
        historicalObj = new HistoricalStock();
        historicalObj.save(stockModel[0].id, stock.value).then(() => {});
      });
    });
  }
  setInterval(scrape, 60000);
});
