global.__base = __dirname + '/';

let express  = require('express');
let api = require('./app/routes/api.js')
let db       = require('./app/db.js')
let app      = express();

app.use('/', api)
app.listen('3001');

console.log('Server is just getting started.');

exports.module = app;
