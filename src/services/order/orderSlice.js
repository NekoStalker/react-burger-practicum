import {createSlice} from '@reduxjs/toolkit'
import {getOrderModal} from './orderRequests'
const initialState = {
    orderID: -1,
    orderStatus: "",
    createdOrder: {},
    isLoading: false,
    error: null,
    openModal: false,
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        closeModalOrder: (state, action) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderModal.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderModal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.createdOrder = action.payload;
                state.orderID = action.payload.number;
                state.openModal = true;
            })
            .addCase(getOrderModal.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});
export const {closeModalOrder} = orderSlice.actions;
export default orderSlice.reducer;