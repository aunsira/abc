global.__base = __dirname + '/';

let gulp            = require('gulp');
let gulpUtil        = require('gulp-util');
let request         = require('request');
let fs              = require('fs');
let cheerio         = require('cheerio');

let Stock           = require('./app/models/stock');
let HistoricalStock = require('./app/models/historical_stock');

let formatText      = require('./lib/format_text')

gulp.task('scrape', () => {

  url = 'http://www.nasdaq.com/';

  let scrape = () => {
    request(url, function(error, response, html){
      if (!error) {
        let $ = cheerio.load(html);
        let stock = { name: "", value: 0.0 };

        $('#indexTable').filter(function() {
          let data = $(this);
          let indexTable = formatText.extractIndexTable(data.text());

          stock.name = formatText.matchesNasdaqIndex(indexTable);
          stock.value = formatText.matchesNasdaqValue(indexTable);
        });
      }

      new Stock().save(stock.name).then(stockModel => {
        historicalObj = new HistoricalStock();
        historicalObj.save(stockModel[0].id, stock.value).then(() => {});
      });
    });
  }
  setInterval(scrape, 1000);
});
