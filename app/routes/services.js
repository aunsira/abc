var express = require('express');
var request = require('request');
var fs      = require('fs');
var cheerio = require('cheerio');

var Stock = require('../models/stock');
var HistoricalStock = require('../models/historical_stock');

var router  = express.Router();

router.get('/scrape', function(req, res){

  url = 'http://www.nasdaq.com/';

  request(url, function(error, response, html){
    if (!error) {
      var $ = cheerio.load(html);
      var stock = { name: "", value: 0.0 };
      var historical_data = {};

      result = $('#indexTable').filter(function() {
        var data = $(this);
        var formatted_data = data.text()
                           .match("((.*));")[1]
                           .split(',');
        console.log(formatted_data[0].match(/"(.*?)"/)[0]);
        console.log(parseFloat(formatted_data[1].replace(/"/g, '')));
        stock.name = formatted_data[0].match(/"(.*?)"/)[0].replace(/"/g, '');
        stock.value = parseFloat(formatted_data[1].replace(/"/g, ''))
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
