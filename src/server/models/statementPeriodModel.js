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
    }, {minimize: false}]
});

statementPeriodSchema.statics.createStatementPeriod = function (statementPeriod, callback) {
    return this.create(statementPeriod, callback) // Model instance method
};

module.exports = mongoose.model('statementPeriod', statementPeriodSchema);
