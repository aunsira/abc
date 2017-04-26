var knex = require('../db.js');

class Stock {
  constructor() {
    this.table = 'stocks';
  }

  findAll() {
    return knex.select().from(this.table);
  }

  findByName(name) {
    return knex.select()
               .from(this.table)
               .where('name', '=', name);
  }

  save(stock) {
    return knex.insert({ name: stock })
               .into(this.table)
               .catch(() => {
                 return knex.select()
                            .from(this.table)
                            .where('name', '=', stock);
               });
  }
}

module.exports = Stock;
