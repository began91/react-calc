import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    operations: '0',
    result: '0',
    previousNumber: null,
    operator: ''
};

const operators = ['+','-','/','*'];

const handleNumKey = (state, event, key) => {
    //if operations or result = 0
    if (state.operations==='0') {
        state.operations = key.toString();
    } else {
        state.operations += key.toString();
    }

    if (state.result === '0') {
        state.result = key.toString();
    } else {
        state.result += key.toString();
    }
}

const handleDecimal = (state, event, key) => {
    if (!state.result.includes('.')) {
        state.result += '.';
        state.operations += '.';
    }
}

const handleOperator = (state, event, key) => {
    if (!state.operator) {
        state.operator = key;
        state.operations += ` ${key} `;
        state.previousNumber = state.result;
    } else {

        // const operatorIndex = state.operations.indexOf(//location of operator, or -1 if no operator.
        //     state.operator
        //     //returns index that is already in the string or undefined
        //     )
            
        // if (state.operations.length - operatorIndex === 2) {
        //     state.operations[operatorIndex] = key;
        // } else if (operatorIndex === -1) {
            
        // }
    }
        
        //if the operator is not followed by any numbers
            //change operator
        // else
            //evaluate operation and set new operator        
        // evaluateOperation(state)
}

export const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        handleKey: (state, action) => {
            const [event, type, key] = action.payload;
            // console.log(event);
            // console.log(type);
            // console.log(key);
            if (type==="num") {
                handleNumKey(state, event, key);
            }
            if (type==="decimal") {
                handleDecimal(state, event, key);
            }
            if (type==="operator") {
                handleOperator(state, event, key);
            }
        },
        setState: (state, action) => {
            console.log(action.payload);
            state[action.payload.key] = action.payload.value;
        },
        clearResult: state => {
            state.result = '0';
        },
        clearOpearations: state => {
            state.operations = '0';
            state.result = '0';
        }
    }
});

export const {handleKey} = calcSlice.actions;