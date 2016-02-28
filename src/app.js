/**
 * Created by stefan on 2/27/2016.
 */

var path = require('path');
var express = new require('express');
var app = express();
var main = require('./controllers/main');
var mongoose = new require('mongoose');

var debug = require('debug')('app');

mongoose.connect('mongodb://localhost/expenses');

app.use(main);

app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);



app.listen(app.get('port'));