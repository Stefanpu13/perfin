/**
 * Created by stefan on 2/28/2016.
 */
var express = require('express');
var router = express.Router();
var monthlyExpenseModel = require('../models/monthlyExpensesModel');

router.get('/', (req, res) => {
    res.end('monthly expenses');
});

router.get('/previous', (req,res) =>{
   res.end('Previous month');
});

router.get('/save', (req,res) => {
    var monthlyExpense = {
        month:2,
        startDate:new Date(),
        endDate:new Date()
    };
    monthlyExpenseModel.addMonthlyExpense(monthlyExpense)
});



module.exports = router;