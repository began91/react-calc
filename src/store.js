import {createStore} from 'redux';
import {calcSlice} from './features/calcSlice'

export default createStore(calcSlice.reducer);