import React from 'react';
import {useSelector} from 'react-redux';

const Result = () => {
    const result = useSelector(state => state.result);
    
    return (
    <div id="result">
        {result}
    </div>
    )
}

export default Result;