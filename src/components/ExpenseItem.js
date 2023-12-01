import React, { useContext } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { currency, dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: { id: props.id },
        });
    };

    const modifyExpense = (name, actionType) => {
        const expense = {
            id: props.id,
            name: name,
            cost: 10, // Modify this value as needed
        };

        dispatch({
            type: actionType,
            payload: expense,
        });
    };

    const increaseAllocation = (name) => {
        modifyExpense(name, 'ADD_EXPENSE');
    };

    const decreaseAllocation = (name) => {
        modifyExpense(name, 'RED_EXPENSE');
    };

    return (
        <tr>
            <td className="col">{props.name}</td>
            <td className="col">{currency}{props.cost}</td>
            <td className="col">
                <FaPlusCircle
                    size='1.2em'
                    color="#4ead5c"
                    onClick={() => increaseAllocation(props.name)}
                />
            </td>
            <td className="col">
                <FaMinusCircle
                    size='1.2em'
                    color="#af1e11"
                    onClick={() => decreaseAllocation(props.name)}
                />
            </td>
            <td className="col">
                <TiDelete size='1.5em' onClick={handleDeleteExpense} />
            </td>
        </tr>
    );
};

export default ExpenseItem;
