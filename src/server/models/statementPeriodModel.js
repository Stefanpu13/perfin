/**
 * Created by stefan on 2/28/2016.
 */
var mongoose = new require('mongoose');
var Schema = mongoose.Schema;

var statementPeriodSchema = new Schema({
    startDate: Date,
    endDate: Date,
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
    return this.findOne({}, {}, { sort: { 'created_at' : -1 } }, callback);
};

module.exports = mongoose.model('statementPeriod', statementPeriodSchema);
