var config    = require('../knexfile.js');
var env       = 'development';
var knex      = require('knex')(config[env]);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

knex.migrate.latest([config]);
