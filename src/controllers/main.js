/**
 * Created by stefan on 2/28/2016.
 */
var express = require('express');
var router = express.Router();

router.use('/monthlyExpenses', require('./monthlyExpenses'));

//router.get('/', function (req, res) {
//    res.end('Main page');
//});

router.get('/home', function(req, res) {
    res.send('Hello World!')
});

module.exports = router;
