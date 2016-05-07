/**
 * Created by stefan on 4/23/2016.
 */

function updateExpenses(newExpensesValue, oldExpenses, category, subcategory) {
    oldExpenses[category] = oldExpenses[category] || {};
    oldExpenses[category][subcategory] = Number(newExpensesValue);
    return oldExpenses;
}

function addExpenses(addedExpensesValue, oldExpenses, category, subcategory) {
    oldExpenses[category] = oldExpenses[category] || {};
    let subcategoryValue = Number(oldExpenses[category][subcategory]) || 0;

    // try to return the sum but not the mutated object
    oldExpenses[category][subcategory] = subcategoryValue + Number(addedExpensesValue);
    return oldExpenses;
}

module.exports = {
    add: addExpenses,
    update: updateExpenses
};