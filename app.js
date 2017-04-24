var express  = require('express');
var services = require('./app/routes/services.js')
var app      = express();

app.use('/', services)
app.listen('3001');

console.log('Server is just getting started.');

exports.module = app;
