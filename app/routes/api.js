let express         = require('express');
let request         = require('request');
let fs              = require('fs');
let cheerio         = require('cheerio');
let httpStatusCodes = require('http-status-codes');
let config          = require(__base + 'config/default')
let basicAuth       = require('basic-auth')

let Stock           = require(__base + 'app/models/stock');
let HistoricalStock = require(__base + 'app/models/historical_stock');

let formatText = require(__base + 'lib/format_text')

let router  = express.Router();

const HTTP_USER = process.env.HTTP_USER
const HTTP_PASS = process.env.HTTP_PASS

const auth = function (req, res, next) {
  if (!HTTP_PASS) return next()
  const credentials = basicAuth(req)
  if (!credentials) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Invalid credentials."')
    return res.status(401).end()
  }
  if (credentials.name !== HTTP_USER || credentials.pass !== HTTP_PASS) {
    res.setHeader('WWW-Authenticate', 'Basic realm="User/Password is invalid."')
    console.log('UnAuthenticate')
    return res.status(400).end('Access denied')
  }
  return next()
}

router.get('/api/indexes', auth, (req, res) => {
  let name    = req.query.name;
  let options = {
    from_time: req.query.from_time || 0,
    to_time:   req.query.to_time   || new Date()/1000
  };

  validationResult = validateQueryParams(name, options);

  if (validationResult) {
    res.status(httpStatusCodes.BAD_REQUEST);
    return res.json({
      'error' : validationResult
    });
  }
  name = name.toUpperCase();

  new Stock().findByName(name)
    .then(rows => {
      return new HistoricalStock().findByStockId(rows[0].id, options);
    }).then((data) => {
      return new ResponseObject(name, data);
    }).then((responseObject) => {
      res.json(responseObject);
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
  if (!name instanceof String || name === undefined) {
    return 'Invalid name: must be string value.';
  }

  // Validate time range
  if (options.from_time !== null && options.to_time !== null) {
    if (options.from_time > options.to_time) {
      return 'Invalid time: from_time > to_time';
    }
  }
}

class ResponseObject {
  constructor(name, data) {
    this.name = name || '';
    this.data = data || [];
  }
}

module.exports = router;
