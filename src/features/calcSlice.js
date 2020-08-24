import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    operations: '0',
    result: '0',
    firstNumber: null,
    secondNumber: null,
    operator: null,
    lastOperation: {
        firstNumber: null,
        secondNumber: null,
        operator: null
    },
    history: []
};

const operators = ['+','-','/','*'];

const lastKeyWasOperator = state => state.operations.slice(-2,-1) === state.operator;

const operationsHasTwoOperators = state => lastKeyWasOperator(state) && [...state.operations].filter(char => operators.includes(char)).length >= 2;

const handleNumKey = (state, key) => {
    if (state.result.length >=9 && !lastKeyWasOperator(state)) {
        return state;
    }
    if (operationsHasTwoOperators(state)) {
        state.operations = `${state.result} ${state.operator} ${key.toString()}`;
        state.result = key.toString();
        state.lastOperation = initialState.lastOperation;
    } else if (state.operations==='0' || state.lastOperation.firstNumber) {
        //if operations is 0 or immediately following a previous operation
        state.operations = key.toString();
        state.result = key.toString();
        state.operator = null;
        state.lastOperation = initialState.lastOperation;
    } else if (state.result === '0' && key === 0) {
        //if the result currently reads 0 and 0 is pressed, do nothing.
    } else {
        if (lastKeyWasOperator(state)) { //replace result
            state.result = key.toString();
        } else { //append
            state.result += key.toString();
        }
        state.operations += key.toString(); //always append for operations
    }
}

const handleDecimal = (state, key) => {
    if (operationsHasTwoOperators(state)) {
        state.operations = `${state.result} ${state.operator} 0.`;
        state.result = '0.';
        state.lastOperation = initialState.lastOperation;
    } else if (lastKeyWasOperator(state)) {
        state.result = '0.';
        state.operations += '0.';
    } else if (state.lastOperation.firstNumber) {
        state.result = '0.';
        state.operations = '0.';
        state.lastOperation = initialState.lastOperation;
    } else if (!state.result.includes('.')) {
        state.result += '.';
        state.operations += '.';
    }
}

const handleOperator = (state, key) => {
    if (!state.operator) { //if no operator
        state.operator = key; //set the operator
        state.operations += ` ${key} `; //display the operator
        state.firstNumber = state.result; //store the current number
        state.lastOperation = initialState.lastOperation;
    } else if (state.lastOperation.firstNumber) {
        state.operator = key;
        state.operations = state.result + ` ${key} `;
        state.firstNumber = state.result;
        state.lastOperation = initialState.lastOperation;
    } else if (lastKeyWasOperator(state)) { 
        //the operator was the last thing to be input
        state.operator = key;
        state.operations = state.firstNumber + ` ${key} `;
    } else {
        handleEqual(state, key);
        //evaluate operation and set new operator
        handleOperator(state, key);
    }
}

const handleClear = (state, key) => {
    if (key === 'C' || state.lastOperation.firstNumber || state.operations.length === 1) {
        state = Object.assign({}, initialState, state.history);
    } else if (operationsHasTwoOperators(state)) {
        [state.firstNumber, state.operator, state.result] = state.operations.split(' ');
        state.operations = state.operations.slice(0,-3);
    } else if (lastKeyWasOperator(state)) {
        state.operations = state.operations.slice(0,-3);
        state.operator = null;
    }
    return state;
}

const evaluate = (a, operator, b) => {
    let result;
    switch (operator) {
        case '+':
            result =  (Number(a) + Number(b));
            break;
        case '-':
            result = (Number(a) - Number(b));
            break;
        case '/':
            if (Number(b) === 0) {
                return 'Error';
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
    if (result > 999999999) {
        return '999999999';
    } else {
        return String(Number(result.toFixed(8))).slice(0,9);
    }
}

const handleEqual = (state, key) => {
    if (!state.operator || state.lastOperation.firstNumber) { //if the last operation is in memory
        //repeat the same operation and second number on the result
        if (state.lastOperation.operator) {
            state.operations = `${state.result} ${state.lastOperation.operator} ${state.lastOperation.secondNumber}`
        }
        state.result = evaluate(state.result, state.lastOperation.operator, state.lastOperation.secondNumber);
        state.lastOperation.firstNumber = state.result;
    // } else if (!state.operator) { //if there's no operator return the result
    //     state.result = evaluate(state.result, '', '');
    //     state.lastOperation.firstNumber = state.result;
    } else if (state.firstNumber) {//check there is a previous number
        state.secondNumber = state.result;
        state.operations = `${state.firstNumber} ${state.operator} ${state.secondNumber}`;
        state.result = evaluate(state.firstNumber, state.operator, state.secondNumber);
        state.lastOperation = {
            firstNumber: state.firstNumber,
            secondNumber: state.secondNumber,
            operator: state.operator
        };
    }
    state.operator = null;
    const equation = `${state.operations} = ${state.result}`;
    state.history.unshift({
        firstNumber: state.firstNumber,
        operator: state.operator,
        secondNumber: state.secondNumber,
        result: state.result,
        operations: state.operations,
        equation
    })
}

const handleNeg = (state, key) => {
    let opArr =  [...state.operations];
    opArr.splice(-1*state.result.length, 0,'-');
    state.operations = opArr.join('');
    state.result = String(Number(state.result) * -1);
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
                handleDecimal(state, key);
            }
            if (type==="operator") {
                handleOperator(state, key);
            }
            if (type==="clear") {
                return handleClear(state, key);
            }
            if (type==="equal") {
                handleEqual(state, key);
            }
            if (type==="neg") {
                handleNeg(state, key);
            }
        },
        loadHistoryIndex: (state, action) => {
            console.log(action.payload)
            state = Object.assign({}, state, state.history[action.payload]);
            return state;
        }
    }
});

export const { handleKey, loadHistoryIndex } = calcSlice.actions;