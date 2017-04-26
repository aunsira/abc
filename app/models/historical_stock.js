var knex = require('../db.js');

class HistoricalStock {
  constructor() {
    this.table = 'historical_stocks';
  }

  findAll() {
    return knex.select().from(this.table);
  }

  findByStockId(stock_id) {
    return knex.select()
               .from(this.table)
               .where('stock_id', '=', stock_id);
  }

  save(stock_id, value) {
    return knex.insert({
                  stock_id: stock_id,
                  value: value,
                  record_time: new Date().getTime(),
                })
               .into(this.table);
  }
}

module.exports = HistoricalStock;
