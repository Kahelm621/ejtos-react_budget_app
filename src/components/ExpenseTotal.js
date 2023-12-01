import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
    // Accessing expenses and currency from the AppContext
    const { expenses, currency } = useContext(AppContext);

    // Calculating the total expenses using reduce
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    // Formatting the total expenses with the currency
    const formattedTotal = `${currency}${totalExpenses.toFixed(2)}`;

    return (
        <div className='alert alert-primary'>
            {/* Displaying the total expenses with currency */}
            <span>Spent so far: {formattedTotal}</span>
        </div>
    );
};

export default ExpenseTotal;
