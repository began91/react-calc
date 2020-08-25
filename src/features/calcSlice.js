import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    firstNumber: '0',
    secondNumber: null,
    firstOperator: null,
    secondOperator: null,
    result: null,
    status: 'fresh',
    history: []
};

const handleNumKey = (state, key) => {
    if (state.status.includes('Number')) {
        if (state[state.status] === '0') {
            state[state.status] = key.toString();
        } else if (state[state.status].length < 9) {
            state[state.status] += key.toString();
        }
    } else if (state.status.includes('Operator')) {
        state.secondNumber = key.toString();
        state.status = 'secondNumber';
        state.firstOperator = state.secondOperator || state.firstOperator;
        state.secondOperator = null;
        state.firstNumber = state.result || state.firstNumber;
    } else {//result or fresh
        state.firstOperator = null;
        state.secondNumber = null;
        state.result = null;
        state.firstNumber = key.toString();
        state.status = 'firstNumber';
    }
}

const handleDecimal = (state) => {//can probably combine logic with number;
    if (state.status.includes('Number')) {
        if (!state[state.status].includes('.') && state[state.status].length <= 8) {
            state[state.status] += '.';
        }
    } else if (state.status.includes('Operator')) {
        state.secondNumber = '0.';
        state.status = 'secondNumber';
        state.firstOperator = state.secondOperator || state.firstOperator;
        state.secondOperator = null;
        state.firstNumber = state.result || state.firstNumber;
    } else {
        state.firstOperator = null;
        state.secondNumber = null;
        state.firstNumber = '0.';
        state.status = 'firstNumber';
    }
}

const handleOperator = (state, key) => {
    if (state.status === 'fresh' || state.status === 'firstNumber') {
        state.status = 'firstOperator';
        state.firstOperator = key;
    } else if (state.status === 'secondNumber') {
        evaluate(state);
        state.status = 'secondOperator';
        state.secondOperator = key;
    } else if (state.status.includes('Operator')) {
        state[state.status] = key;
    } else {//result
        state.firstNumber = state.result;
        state.result = null;
        state.secondNumber = null;
        state.firstOperator = key;
        state.status = 'firstOperator';
    }
}

const handleClear = (state, key) => {
    if (key === 'C' || state.status === 'fresh' || (state.status === 'firstNumber' && state.firstNumber.length === 1) || state.status === 'result') {
        const history = state.history;
        state = Object.assign({}, initialState, {history});
    } else if (state.status.includes('Operator')) {
        state[state.status] = null;
        state.status = state.status.slice(0,-8) + 'Number';
    } else {//state = first or second number
        if (state[state.status].length === 1) {
            state[state.status] = null;
            state.status = 'firstOperator';
        } else {
            state[state.status] = state[state.status].slice(0,-1);
        }
    }
    return state;
}

const evaluate = (state) => {
    if (state.status === 'result') {
        state.firstNumber = state.result;
    } else if (state.status.includes('Operator')) {
        state.firstNumber = state.result || state.firstNumber;
        state.secondNumber = state.result || state.firstNumber;
        state.firstOperator = state.secondOperator || state.firstOperator;
        state.secondOperator = null;
    }
    let a = state.firstNumber;
    let operator = state.firstOperator;
    let b = state.secondNumber;
    let result;
    if (b==='-') {
        result = 'Error';
    } else {
        switch (operator) {
            case '+':
                result =  (Number(a) + Number(b));
                break;
            case '-':
                result = (Number(a) - Number(b));
                break;
            case '/':
                if (Number(b) === 0) {
                    result = 'Error';
                } else {
                    result = (Number(a) / Number(b));
                }
                break;
            case '*':
                result = (Number(a) * Number(b));
                break;
            default: 
                result = Number(a);
                break;
            }
        }
    if (result > 999999999) {
        result = '999999999';
    } else {
        result = String(Number(result.toFixed(8))).slice(0,9);
    }
    state.result = result;
    state.status = 'result';
    state.history.unshift({
        firstNumber: state.firstNumber,
        firstOperator: state.firstOperator,
        secondNumber: state.secondNumber,
        result: state.result
    });
}

const handleNeg = (state) => {
    if (state.status === 'fresh') {
        state.firstNumber = '-';
        state.status = 'firstNumber';
    } else if (state.status.includes('Number')) {
        state[state.status] = String(-1*state[state.status]);
    } else if (state.status.includes('Operator')) {
        state.secondNumber = '-';
        state.status = 'secondNumber';
        state.firstOperator = state.secondOperator || state.firstOperator;
        state.secondOperator = null;
        state.firstNumber = state.result || state.firstNumber;
    } else {
        state.firstNumber = String(-1 * state.result);
        state.firstOperator = null;
        state.secondNumber = null;
        state.result = null;
        state.status = 'firstNumber';
    }
}

export const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        handleKey: (state, action) => {
            const [type, key] = action.payload;
            // console.log(type);
            // console.log(key);
            if (type==="num") {
                handleNumKey(state, key);
            }
            if (type==="decimal") {
                handleDecimal(state);
            }
            if (type==="operator") {
                handleOperator(state, key);
            }
            if (type==="clear") {
                return handleClear(state, key);
            }
            if (type==="equal") {
                evaluate(state);
            }
            if (type==="neg") {
                handleNeg(state);
            }
        },
        loadHistoryIndex: (state, action) => {
            state = Object.assign({}, state, state.history[action.payload]);
            return state;
        }
    }
});

export const { handleKey, loadHistoryIndex } = calcSlice.actions;