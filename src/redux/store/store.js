import {configureStore} from '@reduxjs/toolkit';
import customerSlicer from '../slicers/customerSlicer.js';
import billingReducer from "../slicers/billsSlicer.js";

const store = configureStore({
    reducer : {
        customers:customerSlicer,
         billing:billingReducer
    }
})

export default store;