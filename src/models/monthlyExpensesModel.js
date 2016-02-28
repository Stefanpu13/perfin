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


var monthlyExpensesModel = mongoose.model('monthlyExpenses', monthlyExpensesSchema);

monthlyExpensesSchema.methods.addMonthlyExpense = function (monthlyExpense) {
    monthlyExpensesModel.month = monthlyExpense.month;
    monthlyExpensesModel.startDate = monthlyExpense.startDate;
    monthlyExpense.endDate = monthlyExpense.endDate;

    return monthlyExpensesModel.save((err) => {
        if (err) {
            console.log('error during saving');
            return;
        }

        console.log('successful saving');
    });
};


module.exports.addMonthlyExpense = monthlyExpensesSchema.methods.addMonthlyExpense;
//module.exports = {
//    monthlyExpenses: monthlyExpensesModel
//};