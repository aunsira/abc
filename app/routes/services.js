var express = require('express');
var request = require('request');
var fs      = require('fs');
var cheerio = require('cheerio');
var router  = express.Router();

router.get('/scrape', function(req, res){

  url = 'http://www.nasdaq.com/aspx/infoquotes.aspx?symbol=IXIC';

  request(url, function(error, response, html){
    if (!error) {
      var $ = cheerio.load(html);
      var json = { lastSale: "", netChange: "", percentChange: "" };

      $('#IXIC_LastSale2').filter(function() {
        var data = $(this);
        lastSale = data.text();
        json.lastSale = lastSale;
      });

      $('#IXIC_Chg1').filter(function() {
        var data = $(this);
        netChange = data.text();
        json.netChange = netChange;
      });

      $('#IXIC_Per1').filter(function() {
        var data = $(this);
        percentChange = data.text();
        json.percentChange = percentChange;
      });
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log("File successfully written! - Check your project directory for the output.json file");
    });

    res.send('Check your console!');
  });
});

module.exports = router;
