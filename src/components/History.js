import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHistoryIndex } from '../features/calcSlice'
import './History.css';



const History = props => {
    const dispatch = useDispatch();
    const history = useSelector(state => state.calc.history);

    const historyList = history?.map((entry, i) => (
        <div className="history-entry" key={i} onClick={() => dispatch(loadHistoryIndex(i))}>
            <span className="history-operations">
                {entry.firstNumber + (entry.firstOperator ? (entry.firstOperator + entry.secondNumber) : '') + '= '}
            </span>
            <br/>
            <span className="history-result">
                {entry.result}
            </span>
        </div>
    ))

    return (
        <div id="history">
            <h3>History</h3>
            {historyList.slice(0,5)}
        </div>
    );
}

export default History;

