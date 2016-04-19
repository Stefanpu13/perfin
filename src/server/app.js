/**
 * Created by stefan on 2/27/2016.
 */
'use strict';

let path = require('path');
let bodyParser = new require('body-parser');
let express = new require('express');
let app = express();
let main = require('./controllers/main');
let mongoose = new require('mongoose');
let scheduler = new require('./statementDayScheduler');


let debug = require('debug')('app');

mongoose.connect('mongodb://localhost/expenses');
//mongoose.connect('mongodb://127.0.0.1/expenses'); // use when need to work offline

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(main);

app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));

scheduler.startCreateStatementPeriodDaysTask();