var express = require('express');
var request = require('request');
var fs      = require('fs');
var cheerio = require('cheerio');
var router  = express.Router();

router.get('/scrape', function(req, res){

  url = 'http://www.nasdaq.com/';

  request(url, function(error, response, html){
    if (!error) {
      var $ = cheerio.load(html);
      var json = { lastSale: "", netChange: "", percentChange: "" };

      $('#indexTable').filter(function() {
        var data = $(this);
        var lastSale = data.text()
                           .match("((.*));")[1]
                           .split(',');
        console.log(parseFloat(lastSale[1].replace(/"/g, '')));
        json.lastSale = lastSale[1].replace(/"/g, '');
      });
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log("File successfully written! - Check your project directory for the output.json file");
    });

    res.send('Check your console!');
  });
});

module.exports = router;
