import {ICreatedOrder,IOrderState} from '../types/orderTypes';
import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import {getOrderModal} from './orderRequests';

export const initialState: IOrderState = {
    orderID: -1,
    orderStatus: "",
    createdOrder: null,
    isLoading: false,
    error: null,
    openModal: false,
}
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        closeModalOrder: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderModal.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderModal.fulfilled, (state, action:PayloadAction<ICreatedOrder>) => {
                state.isLoading = false;
                state.createdOrder = action.payload;
                state.orderID = action.payload.order.number;
                state.openModal = true;
            })
            .addCase(getOrderModal.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to create order';
            })
    }
});
export const {closeModalOrder} = orderSlice.actions;
export default orderSlice.reducer;