global.__base = __dirname + '/';

var express  = require('express');
var api = require('./app/routes/api.js')
var db       = require('./app/db.js')
var app      = express();

app.use('/', api)
app.listen('3001');

console.log('Server is just getting started.');

exports.module = app;
