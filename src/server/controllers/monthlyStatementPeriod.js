/**
 * Created by stefan on 2/28/2016.
 */
'use strict';

var express = new require('express');
var router = express.Router();
var StatementPeriodModel = new require('../models/statementPeriodModel');
let scheduler = new require('../statementDayScheduler');

let createStatementPeriodFromExistingPeriod = (req, res, next) => {
    let statementPeriodDays = req.body;
    let newStatementPeriod = {
        isLastPeriod: true,
        startDate: statementPeriodDays[0].day,
        statementPeriodDays: statementPeriodDays
    };

    StatementPeriodModel.createStatementPeriod(newStatementPeriod, (err, statementPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            req.newStatementPeriod = newStatementPeriod;
            req.newStatementPeriod._id= statementPeriod._doc._id;
            next();
        }
    });
};

let createIsLastPeriodOption = (req, res, next) => {
    let isLastPeriodOption = {
        $set: {'isLastPeriod': false}
    };

    req.isLastPeriodOption = isLastPeriodOption;

    next();
};

let createRemoveDaysFromPeriodOption = (req, res, next) => {
    let periodDaysIds = req.body.map(day => {
        return day._id;
    });
    let removeDaysFromPeriodOption = {
        $pull: {statementPeriodDays: {_id: {$in: periodDaysIds}}}
    };

    req.removeDaysFromPeriodOption = removeDaysFromPeriodOption;

    next();
};

let updateOldStatementPeriod = (req, res, next) => {
    // 1. Create new StatementPeriod with new days
    // 2. Remove days from statement period with statement period id
    // 3. Return new statement period

    let statementPeriodId = req.params.statementPeriodId;
    let query = {_id: statementPeriodId};
    let updateOptions = Object.assign({}, req.isLastPeriodOption, req.removeDaysFromPeriodOption);

    StatementPeriodModel.findOneAndUpdate(query, updateOptions, {new: true}, (err, updatedPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(req.newStatementPeriod);
        }
    });
};

router.get('/', (req, res) => {
    res.end('monthly expenses');
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

router.get('/getPrevious/:statementPeriodId', (req, res) => {
    let statementPeriodId = req.params.statementPeriodId;
    StatementPeriodModel.getPreviousPeriod(statementPeriodId, (err, previousStatementPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(previousStatementPeriod);
        }
    });
});

router.get('/getNext/:statementPeriodId', (req, res) => {
    let statementPeriodId = req.params.statementPeriodId;
    StatementPeriodModel.getNextPeriod(statementPeriodId, (err, previousStatementPeriod) => {
        if (err) {
            res.status(500).end('Error occurred');
        } else {
            res.status(200).json(previousStatementPeriod);
        }
    });
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

router.post('/create', (req, res) => {
    var statementPeriodDays = req.body;
    var newStatementPeriod = {
        isLastPeriod: true,
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

router.use('/create/fromPeriod/:statementPeriodId', createStatementPeriodFromExistingPeriod);
router.use('/create/fromPeriod/:statementPeriodId', createIsLastPeriodOption);
router.use('/create/fromPeriod/:statementPeriodId', createRemoveDaysFromPeriodOption);
router.post('/create/fromPeriod/:statementPeriodId', updateOldStatementPeriod);

router.post('/updateExpenses/:statementPeriodId/:statementPeriodDayId', (req, res) => {
    let statementPeriodId = req.params.statementPeriodId;
    let statementPeriodDayId = req.params.statementPeriodDayId;
    let newExpenses = req.body;

    let query = {_id: statementPeriodId, 'statementPeriodDays._id': statementPeriodDayId};
    let updateOptions = {
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

router.post('/updateIncome/:statementPeriodId', (req, res) => {
    let statementPeriodId = req.params.statementPeriodId;
    let newIncome = req.body;

    let query = {_id: statementPeriodId};
    let updateOptions = {
        $set: {'income': newIncome}
    };

    //res.status(500).end('Error Occurred');

    StatementPeriodModel.findOneAndUpdate(query, updateOptions, {new: true},
        (err, updatedPeriod) => {
            if (err) {
                res.status(500).end('Error occurred');
            } else {
                res.status(200).json(updatedPeriod);
            }
        });
});

module.exports = router;