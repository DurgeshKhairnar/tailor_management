import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customerList: []
};

export const customerSlicer = createSlice({
        name:'customer',
        initialState,
        reducers:{
            addCustomer : (state,action) => {
                const customer = action.payload;

                state.customerList.push({
                    _id:state.customerList.length + 1,
                    customerName:customer.customerName,
                    mobileNumber:customer.mobileNumber,
                    gender:customer.gender,
                    customerType:customer.customerType,
                    address:customer.address
                });
            },
            getCustomer : (state,action) => {
                state.customerList = action.payload;
            }
        }
});


export const {addCustomer,getCustomer} = customerSlicer.actions;

export default customerSlicer.reducer;