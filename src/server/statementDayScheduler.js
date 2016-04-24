/**
 * Created by stefan on 4/17/2016.
 */
'use strict';

let nodeScheduler = new require('node-schedule');
let StatementPeriodModel = new require('./models/statementPeriodModel');
let moment = new require('moment');

let createDaysError = null;
//let reqCounter = 0;

let createConsecutiveDaysForCurrentPeriod = (lastDayInPeriodDate) => {
    // create consecutive days and add them to array until created day is today

    let statementPeriodDays = [];
    // 'format' is used to remove 'time' component. This avoids rounding to lower value of 'diff'
    // "toDate" is used to fix error in moment
    let maxDaysToAdd = moment().diff(new Date(moment(lastDayInPeriodDate).format("MM-DD-YYYY")), 'days');

    for (let daysToAdd = 1; daysToAdd <= maxDaysToAdd; daysToAdd++) {
        let newStatementPeriodDay = {
            day: moment(lastDayInPeriodDate).add(daysToAdd, 'days').toDate()
        };

        statementPeriodDays.push(newStatementPeriodDay);
    }

    return statementPeriodDays;
};

let lastStatementDayCreationFailed = (req, res, next) =>{
    if(createDaysError){
        req.statementDayCreationError = createDaysError;
        createDaysError = null;
    }

    next();
};

let startCreateStatementPeriodDaysTask = () => {
    nodeScheduler.scheduleJob({hour: moment().hour(), minute: moment().add(1, 'minutes').minute()}, () => {
        // Move this function to middleware that is used on navigation to home page
        StatementPeriodModel.getCurrentStatementPeriod((err, statementPeriod) => {
            if (statementPeriod) {
                let statementPeriodDaysLength = statementPeriod.statementPeriodDays.length;
                let lastDayInCurrentPeriod = statementPeriod.statementPeriodDays[statementPeriodDaysLength - 1];
                let todayIsAfterLastDayInPeriod = moment().isAfter(lastDayInCurrentPeriod.day, 'day');

                if (todayIsAfterLastDayInPeriod) {
                    //addStatementPeriodDays to period

                    let newStatementPeriodDays = createConsecutiveDaysForCurrentPeriod(lastDayInCurrentPeriod.day);
                    Array.prototype.push.apply(statementPeriod.statementPeriodDays, newStatementPeriodDays);
                    StatementPeriodModel.update({}, statementPeriod, (err, raw) => {
                        if (err) {
                            // TODO: how to prepare message for the user when he opens the app?
                            createDaysError = {
                                message: "The automatic day insertion failed for "  +
                            newStatementPeriodDays[newStatementPeriodDays.length -1] +
                                '. Please, contact an administrator.'};
                        }
                    });
                }
            }
        })
    })
};

module.exports = {
    startCreateStatementPeriodDaysTask: startCreateStatementPeriodDaysTask,
    lastStatementDayCreationFailed:lastStatementDayCreationFailed
};
