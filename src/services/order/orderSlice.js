import {createSlice} from '@reduxjs/toolkit'
import {getOrder} from './orderRequests'
export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderID: -1,
        orderStatus: "",
        createdOrder: {},
        loading: false,
        error: null
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allIngredients = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});