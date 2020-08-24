import {configureStore} from '@reduxjs/toolkit';
import {calcSlice} from './features/calcSlice'

export default configureStore({
    reducer: {
        calc: calcSlice.reducer
    }
});