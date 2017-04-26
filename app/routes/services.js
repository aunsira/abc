var express = require('express');
var request = require('request');
var fs      = require('fs');
var cheerio = require('cheerio');

var Stock = require(__base + 'app/models/stock');
var HistoricalStock = require(__base + 'app/models/historical_stock');

var formatText = require(__base + 'lib/format_text')

var router  = express.Router();

router.get('/api/nasdaq_indexes', function(req, res){

  let arrResponse = [];

  new Stock().findByName('NASDAQ')
    .then(rows => {
      return new HistoricalStock().findByStockId(rows[0].id);
    }).then((data) => {
      arrResponse.push('NASDAQ', data);
    }).then(() => {
      res.json(arrResponse);
    });
  ;
});

module.exports = router;
