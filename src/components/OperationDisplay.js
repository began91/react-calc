import React from 'react';
import {useSelector} from 'react-redux';

const OperationDisplay = props => {
    const equation = useSelector(state => {
        return state.calc.firstNumber + (state.calc.firstOperator ? ` ${state.calc.firstOperator} `: '') + (state.calc.secondNumber ? state.calc.secondNumber : '') + (state.calc.secondOperator ? ` ${state.calc.secondOperator}` : '');
    });
    return (
    <div id="operation-display">
        {equation}
    </div>
    )
}

export default OperationDisplay;