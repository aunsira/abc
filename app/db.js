var config    = require(__base + 'knexfile.js');
var env       = 'development';
var knex      = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);
