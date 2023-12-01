// Import necessary modules from React
import React, { createContext, useReducer } from 'react';

// Define the reducer function to update the state based on actions
export const AppReducer = (state, action) => {
  let budget = 0;

  // Switch statement to handle different action types
  switch (action.type) {
    case 'ADD_EXPENSE':
      let total_budget = 0;
      total_budget = state.expenses.reduce((previousExp, currentExp) => {
        return previousExp + currentExp.cost;
      }, 0);
      total_budget = total_budget + action.payload.cost;

      // Check if the new expense can be added within the budget
      if (total_budget <= state.budget) {
        total_budget = 0;
        // Update the cost of an existing expense if it already exists
        state.expenses.map((currentExp) => {
          if (currentExp.name === action.payload.name) {
            currentExp.cost = action.payload.cost + currentExp.cost;
          }
          return currentExp;
        });
        return {
          ...state,
        };
      } else {
        // Display an alert if the budget is insufficient
        alert('Cannot increase the allocation! Out of funds');
        return {
          ...state,
        };
      }

    case 'RED_EXPENSE':
      // Reduce the cost of a specific expense
      const red_expenses = state.expenses.map((currentExp) => {
        if (
          currentExp.name === action.payload.name &&
          currentExp.cost - action.payload.cost >= 0
        ) {
          currentExp.cost = currentExp.cost - action.payload.cost;
          budget = state.budget + action.payload.cost;
        }
        return currentExp;
      });
      return {
        ...state,
        expenses: [...red_expenses],
      };

    case 'DELETE_EXPENSE':
      // Delete a specific expense
      state.expenses.map((currentExp) => {
        if (currentExp.name === action.payload) {
          budget = state.budget + currentExp.cost;
          currentExp.cost = 0;
        }
        return currentExp;
      });
      return {
        ...state,
        budget,
      };

    case 'SET_BUDGET':
      // Set a new budget
      state.budget = action.payload;
      return {
        ...state,
      };

    case 'CHG_CURRENCY':
      // Change the currency
      state.currency = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};

// Define the initial state of the application
const initialState = {
  budget: 2000,
  expenses: [
    { id: 'Marketing', name: 'Marketing', cost: 50 },
    { id: 'Finance', name: 'Finance', cost: 300 },
    { id: 'Sales', name: 'Sales', cost: 70 },
    { id: 'Human Resource', name: 'Human Resource', cost: 40 },
    { id: 'IT', name: 'IT', cost: 500 },

  ],
  currency: '£',
};

// Create the context to provide the state to components
export const AppContext = createContext();

// Create the provider component that wraps the components to give them access to the state
export const AppProvider = (props) => {
  // Set up the app state using the useReducer hook and the defined reducer function
  const [state, dispatch] = useReducer(AppReducer, initialState);
  let remaining = 0;
  let totalExpenses = 0;

  // Calculate the remaining budget based on expenses
  if (state.expenses) {
    totalExpenses = state.expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);
    remaining = state.budget - totalExpenses;
  }

  // Provide the state and dispatch function to components through the context
  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        totalExpenses,
        budget: state.budget,
        remaining: remaining,
        dispatch,
        currency: state.currency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
