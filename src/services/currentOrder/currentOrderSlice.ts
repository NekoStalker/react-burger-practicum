import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { ICurrentOrderState, IOrder, IOrderGet } from '../types/orderTypes';
import {fetchOrderById} from './currentOrderRequests'
const initialState: ICurrentOrderState = {
    ingredients: [],
    _id: '',
    status: '', 
    name: '',
    number: 0,
    createdAt: '',
    updatedAt: '',
    openModal: false,
    isLoading: false,
    error: '',
};
export const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState: initialState,
    reducers: {
        setCurrentOrder: (state, action: PayloadAction<Partial<ICurrentOrderState>>) => {
            return { ...state, ...action.payload };
        },
        clearCurrentOrder: (state) => {
            return initialState;
        },
        openModalOrder: (state, action: PayloadAction<Partial<ICurrentOrderState>>) => {
            return { ...state, ...action.payload, openModal:true };
        },
        closeModalOrderDetails: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchOrderById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<IOrderGet>) => {
            state.isLoading = false;
            Object.assign(state, action.payload.orders[0]);
          })
          .addCase(fetchOrderById.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
          });
    }
    
});
export const {setCurrentOrder,clearCurrentOrder,openModalOrder,closeModalOrderDetails } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;