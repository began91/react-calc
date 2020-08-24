import React from 'react';
// import { useSelector } from 'react-redux';
import OperationDisplay from './OperationDisplay';
import Result from './Result';
import Keys from './Keys';
import './Calculator.css';

const Calculator = () => {
    // const state = useSelector(state => state);
    return (
        <div id="calculator">
            <OperationDisplay />
            <Result />
            <Keys />
        </div>
    );
}

export default Calculator;