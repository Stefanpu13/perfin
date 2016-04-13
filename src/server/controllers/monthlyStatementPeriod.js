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

router.post('/create', (req, res) => {
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

router.post('/update', (req, res) => {
    var statementPeriod = req.body;
    var obj = {
        statementPerio&dDays: statementPeriod.statementPeriodDays
    };
    StatementPeriodModel.findByIdAndUpdate(statementPeriod._id, obj, {new: true},
        (err, updatedPeriod) => {
            if (err) {
                res.status(500).end('Error occurred');
            } else {
                res.status(200).json(updatedPeriod);
            }
        })
});

router.get('/getCurrent', (req, res) => {
    StatementPeriodModel.getCurrentStatementPeriod(function (err, statementPeriod) {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(statementPeriod);
        }
    })
});

module.exports = router;