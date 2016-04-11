/**
 * Created by stefan on 2/28/2016.
 */
'use strict';

var express = new require('express');
var router = express.Router();
var StatementPeriodModel = new require('../models/statementPeriodModel');

router.get('/', (req, res) => {
    res.end('monthly expenses');
});

router.get('/previous', (req, res) => {
    res.end('Previous month');
});

router.post('/create', function (req, res) {
    var statementPeriodFirstDay = req.body;

    var newStatementPeriod = {
        startDate: statementPeriodFirstDay.day,
        statementPeriodDays: [statementPeriodFirstDay]
    };

    StatementPeriodModel.createStatementPeriod(newStatementPeriod, (err, statementPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(statementPeriod);
        }
    });
});

module.exports = router;