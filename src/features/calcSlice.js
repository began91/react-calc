import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    operations: '0',
    result: '0',
    previousNumber: 0,
    operation: ''
};

export const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        handleKey: (state, action) => {
            const [type, key] = action.payload;
            console.log(type)
            console.log(key);
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