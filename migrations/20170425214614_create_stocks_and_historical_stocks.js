exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('stocks', function(table) {
      table.increments('id').primary();
      table.string('name').unique();
    }).then(() => {
      console.log("Created table `stocks`")
      return knex.schema.createTableIfNotExists('historical_stocks', function(table) {
        table.increments('id').primary();
        table.integer('stock_id').unsigned().references('id').inTable('stocks');
        table.float('value');
        table.bigint('record_time');
      });
    }).then(() => {
      console.log("Created table `historical_stocks`");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stocks'),
    knex.schema.dropTable('historical_stocks'),
  ])
};
