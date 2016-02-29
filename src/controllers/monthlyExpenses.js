/**
 * Created by stefan on 2/28/2016.
 */
'use strict';

var express = require('express');
var router = express.Router();
var monthlyExpenseModel = new require('../models/monthlyExpensesModel');

router.get('/', (req, res) => {
    res.end('monthly expenses');
});

router.get('/previous', (req,res) =>{
   res.end('Previous month');
});

router.post('/save', (req,res) => {
    if(!req.body){
        res.status(400).end('no body in the request')
    }
    var monthlyExpense = new monthlyExpenseModel({
        month:Number(req.body.month),
        startDate:new Date(req.body.startDate),
        endDate:new Date(req.body.endDate)
    });

    monthlyExpense.addMonthlyExpense(function (err, monthlyExp, numAffected) {
        if(err){
            res.status(500).end('Error occurred');
        } else{
            res.status(200).end(monthlyExp.toString());
        }
    });
});

module.exports = router;