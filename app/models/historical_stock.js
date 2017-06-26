let knex = require(__base + 'app/db')

class HistoricalStock {
  constructor () {
    this.table = 'historical_stocks'
  }

  findAll () {
    return knex.select().from(this.table)
  }

  findByStockId (stockId, options) {
    return knex.select()
      .from(this.table)
      .where('stock_id', '=', stockId)
      .where('record_time', '>=', options.from_time)
      .where('record_time', '<=', options.to_time)
  }

  save (stockId, value) {
    return knex.insert({
      stock_id: stockId,
      value: value,
      record_time: new Date() / 1000 | 0
    })
      .into(this.table)
  }
}

module.exports = HistoricalStock
