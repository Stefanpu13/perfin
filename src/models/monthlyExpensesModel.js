/**
 * Created by stefan on 2/28/2016.
 */
var mongoose = new require('mongoose');
var Schema = mongoose.Schema;

var monthlyExpensesSchema = new Schema({
    month: Number,
    startDate: Date,
    endDate: Date
});

monthlyExpensesSchema.methods.addMonthlyExpense = function (callback) {
    return this.save(callback);
};


module.exports = mongoose.model('monthlyExpenses', monthlyExpensesSchema);
