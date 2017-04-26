let config    = require(__base + 'config/default');
let env       = 'development';
let knex      = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);
