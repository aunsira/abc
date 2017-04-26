var express = require('express');
var request = require('request');
var fs      = require('fs');
var cheerio = require('cheerio');

var Stock = require('../models/stock');
var HistoricalStock = require('../models/historical_stock');

var formatText = require('../../lib/format_text')

var router  = express.Router();

router.get('/scrape', function(req, res){

  url = 'http://www.nasdaq.com/';

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
});

module.exports = router;
