import React from 'react';
import OperationDisplay from './OperationDisplay';
import Result from './Result';
import Keys from './Keys';
import './Calculator.css';

const Calculator = () => {
    
    return (
        <div id="calculator">
            <OperationDisplay />
            <Result />
            <Keys />
        </div>
    );
}

export default Calculator;