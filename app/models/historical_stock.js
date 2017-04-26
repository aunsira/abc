let knex = require(__base + 'app/db');

class HistoricalStock {
  constructor() {
    this.table = 'historical_stocks';
  }

  findAll() {
    return knex.select().from(this.table);
  }

  findByStockId(stock_id, options) {
    return knex.select()
               .from(this.table)
               .where('stock_id', '=', stock_id)
               .where('record_time', '>=', options.from_time)
               .where('record_time', '<=', options.to_time);
  }

  save(stock_id, value) {
    return knex.insert({
                  stock_id: stock_id,
                  value: value,
                  record_time: new Date()/1000|0,
                })
               .into(this.table);
  }
}

module.exports = HistoricalStock;
