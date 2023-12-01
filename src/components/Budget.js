import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BUDGET_MAX_VALUE = 20000;

const Budget = () => {
  // Destructuring values from the context
  const { budget, totalExpenses, currency, dispatch } = useContext(AppContext);

  // Event handler for budget input change
  const onChangeBudgetHandler = (event) => {
    const enteredValue = Number(event.target.value);

    // Check if the entered value is a number
    if (Number.isNaN(enteredValue)) {
      alert('Please enter a valid number.');
      return;
    }

    // Check if the entered value is an integer number
    if (!Number.isInteger(enteredValue)) {
      alert('Please enter an integer number.');
      return;
    }

    // Check if the entered budget is not lower than total expenses
    if (enteredValue < totalExpenses) {
      alert(
        "The value of the budget can't be lower than the expenses value " +
          currency +
          totalExpenses
      );
    } else {
      // Check if the entered budget is within the allowed maximum value
      if (enteredValue > BUDGET_MAX_VALUE) {
        alert('Please enter a value less than ' + BUDGET_MAX_VALUE);
        return;
      }

      // Dispatch an action to update the budget in the context
      dispatch({
        type: 'SET_BUDGET',
        payload: enteredValue,
      });
    }
  };

  return (
    <div
      className="alert alert-secondary"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      {/* Label for the budget input */}
      <div>
        <label htmlFor="budget">Budget:&nbsp;</label>
      </div>
      
      {/* Display currency and input field for entering a new budget */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{currency}</span>
        <input
          required="required"
          placeholder='Enter your budget'
          type="number"
          id="budget"
          value={budget}
          step="10"
          onChange={onChangeBudgetHandler}
        />
      </div>
    </div>
  );
};

export default Budget;
