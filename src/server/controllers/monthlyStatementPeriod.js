/**
 * Created by stefan on 2/28/2016.
 */
'use strict';

var express = new require('express');
var router = express.Router();
var StatementPeriodModel = new require('../models/statementPeriodModel');
let scheduler = new require('../statementDayScheduler');

router.get('/', (req, res) => {
    res.end('monthly expenses');
});

router.get('/previous', (req, res) => {
    res.end('Previous month');
});

router.post('/create', (req, res) => {
    var statementPeriodDays = req.body;
    var newStatementPeriod = {
        startDate: statementPeriodDays[0].day,
        statementPeriodDays: statementPeriodDays
    };

    StatementPeriodModel.createStatementPeriod(newStatementPeriod, (err, statementPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(statementPeriod);
        }
    });
});

router.use('/create/fromPeriod/:statementPeriodId', (req, res, next) => {
    let statementPeriodDays = req.body;
    let newStatementPeriod = {
        startDate: statementPeriodDays[0].day,
        statementPeriodDays: statementPeriodDays
    };

    StatementPeriodModel.createStatementPeriod(newStatementPeriod, (err, statementPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            req.newStatementPeriod = newStatementPeriod;
            next();
        }
    });

    //req.newStatementPeriod = newStatementPeriod;
    //next();
});

router.post('/create/fromPeriod/:statementPeriodId', (req, res, next) => {
    // 1. Create new StatementPeriod with new days
    // 2. Remove days from statement period with statement period id
    // 3. Return new statement period

    let statementPeriodId = req.params.statementPeriodId;
    let periodDaysIds = req.body.map(day => {
        return day._id;
    });
    let query = {_id: statementPeriodId};
    let updateOptions = {
        $pull: {statementPeriodDays: {_id: {$in: periodDaysIds}}}
    };
    StatementPeriodModel.findOneAndUpdate(query, updateOptions, {new: true}, (err, updatedPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(req.newStatementPeriod);
        }
    });


    //res.status(200).json(req.newStatementPeriod);

    //StatementPeriodModel.createStatementPeriod(newStatementPeriod, (err, statementPeriod) => {
    //    if (err) {
    //        res.status(500).end('Error occurred');
    //    } else {
    //        next(statementPeriod);
    //    }
    //});


});


router.post('/update/:statementPeriodId/:statementPeriodDayId', (req, res) => {
    let statementPeriodId = req.params.statementPeriodId;
    let statementPeriodDayId = req.params.statementPeriodDayId;
    var newExpenses = req.body;

    var query = {_id: statementPeriodId, 'statementPeriodDays._id': statementPeriodDayId};
    var updateOptions = {
        $set: {'statementPeriodDays.$.expenses': newExpenses}
    };

    // res.status(500).end('Error Occurred');

    StatementPeriodModel.findOneAndUpdate(query, updateOptions, {new: true},
        (err, updatedPeriod) => {
            if (err) {
                res.status(500).end('Error occurred');
            } else {
                res.status(200).json(updatedPeriod);
            }
        })
});

router.get('/hasStatementDayCreationError',
    scheduler.lastStatementDayCreationFailed,
    (req, res) => {
        if (req.statementDayCreationError) {
            res.status(500).json(req.statementDayCreationError);
        } else {
            res.status(200).end();
        }
    });

router.get('/getCurrent', (req, res) => {
    StatementPeriodModel.getCurrentStatementPeriod(function (err, statementPeriod) {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(statementPeriod);
        }

        //res.status(500).end('Error occurred');
    })
});

module.exports = router;