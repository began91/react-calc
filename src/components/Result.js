import React from 'react';
import {useSelector} from 'react-redux';

const Result = () => {
    const result = useSelector(state => {
        switch (state.calc.status) {
            case 'result':
                return state.calc.result;
            case 'fresh':
                return '0';
            case 'firstNumber':
                return state.calc.firstNumber;
            case 'secondNumber':
                return state.calc.secondNumber;
            case 'firstOperator':
                return state.calc.firstNumber;
            case 'secondOperator':
                return state.calc.result;
            default:
                return '0';
        }
    });
    
    return (
    <div id="result">
        {result}
    </div>
    )
}

export default Result;