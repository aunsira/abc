var bookshelf = require('../db.js');

var Stock = bookshelf.Model.extend({
  tableName: 'stocks',
});

module.exports = Stock;
