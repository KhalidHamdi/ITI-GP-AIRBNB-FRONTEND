import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
});

export default store;
