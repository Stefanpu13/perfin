/**
 * Created by stefan on 2/28/2016.
 */
var express = require('express');

var router = express.Router();
var statementPeriodRouter = require('./monthlyStatementPeriod');

router.use('/api/monthlyStatementPeriod', statementPeriodRouter);

//router.get('/', function (req, res) {
//    res.end('Main page');
//});

router.get('/home', function(req, res) {
    res.send('Hello World!')
});

module.exports = router;
