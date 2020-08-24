import React from 'react';
import {useSelector} from 'react-redux';

const OperationDisplay = props => {
    const operations = useSelector(state => state.calc.operations);
    return (
    <div id="operation-display">
        {operations}
    </div>
    )
}

export default OperationDisplay;