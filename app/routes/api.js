let express         = require('express');
let request         = require('request');
let fs              = require('fs');
let cheerio         = require('cheerio');
let httpStatusCodes = require('http-status-codes');
let config          = require(__base + 'config/default')

let Stock           = require(__base + 'app/models/stock');
let HistoricalStock = require(__base + 'app/models/historical_stock');

let formatText = require(__base + 'lib/format_text')

let router  = express.Router();

router.get('/api/indexes', function(req, res){
  let name     = req.query.name.toUpperCase();
  let options = {
    from_time: req.query.from_time || 0,
    to_time: req.query.to_time || new Date()/1000
  };

  validationResult = validateQueryParams(name, options);

  if (validationResult) {
    res.status(httpStatusCodes.BAD_REQUEST);
    return res.json({
      'error' : validationResult
    });
  }

  let arrResponse = [];

  new Stock().findByName(name)
    .then(rows => {
      return new HistoricalStock().findByStockId(rows[0].id, options);
    }).then((data) => {
      arrResponse.push(name, data);
    }).then(() => {
      res.json(arrResponse);
    }).catch((error) => {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
      return res.json({
        'error' : `Could not find stock name: ${name} on the server`
      });
    });
  ;
});

function validateQueryParams(name, options) {
  // Validate index name.
  if (!name instanceof String) {
    return 'Invalid name: must be string value.';
  }

  // Validate time range
  if (options.from_time !== null && options.to_time !== null) {
    if (options.from_time > options.to_time) {
      return 'Invalid time: from_time > to_time';
    }
  }
}

module.exports = router;
