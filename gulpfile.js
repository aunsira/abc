global.__base = __dirname + '/'

let gulp    = require('gulp')
let request = require('request')
let cheerio = require('cheerio')
let config  = require('./config/default')

let Stock           = require('./app/models/stock')
let HistoricalStock = require('./app/models/historical_stock')

let formatText = require('./lib/format_text')

gulp.task('scrape', () => {
  let scrape = () => {
    request(config.source.url, function (error, response, html) {
      if (!error) {
        let $ = cheerio.load(html)
        let stock = { name: '', value: 0.0 }

        $('#indexTable').filter(() => {
          let data = $(this)
          let indexTable = formatText.extractIndexTable(data.text())

          stock.name = formatText.matchesNasdaqIndex(indexTable)
          stock.value = formatText.matchesNasdaqValue(indexTable)
        })

        new Stock().save(stock.name).then(stockModel => {
          let historicalObj = new HistoricalStock()
          historicalObj.save(stockModel[0].id, stock.value).then(() => {})
        })
      }
    })
  }
  setInterval(scrape, config.app.interval)
})
