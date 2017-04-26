global.__base = __dirname + '/';

let express = require('express');
let api     = require('./app/routes/api.js')
let db      = require('./app/db.js')
let config  = require('./config/default')
let app     = express();

app.use('/', api)
app.listen(config.app.port);

console.log('Server is just getting started.');

exports.module = app;
