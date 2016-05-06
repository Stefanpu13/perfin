/**
 * Created by stefan on 2/28/2016.
 */
var mongoose = new require('mongoose');
var Schema = mongoose.Schema;

var statementPeriodSchema = new Schema({
    isLastPeriod: Boolean,
    startDate: Date,
    endDate: Date,
    income: {salary: Number, other: Number},
    statementPeriodDays: [{
        day: Date,
        expenses: {
            food: {},
            entertainment: {},
            supplies: {}
        }
    }]
});

statementPeriodSchema.statics.createStatementPeriod = function (statementPeriod, callback) {
    return this.create(statementPeriod, callback);// Model instance method
};

statementPeriodSchema.statics.getCurrentStatementPeriod = function (callback) {
    return this.findOne({}, {}, {sort: {'$natural': -1}}, callback);
};

statementPeriodSchema.statics.getPreviousPeriod = function (currentPeriodId, callback) {
    return this.findOne({"_id": {'$lt': currentPeriodId}}).sort({'$natural': -1}).exec(callback);
};

statementPeriodSchema.statics.getNextPeriod = function (currentPeriodId, callback) {
    return this.findOne({"_id": {'$gt': currentPeriodId}}).sort({'$natural': 1}).exec(callback);
};

module.exports = mongoose.model('statementPeriod', statementPeriodSchema);
