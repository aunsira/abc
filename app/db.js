let config    = require(__base + 'knexfile.js');
let env       = 'development';
let knex      = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);
