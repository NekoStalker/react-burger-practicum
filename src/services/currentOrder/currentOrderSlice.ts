import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { ICurrentOrderState, IOrder } from '../types/orderTypes';
const initialState: ICurrentOrderState = {
    ingredients: [],
    _id: '',
    status: '', 
    name: '',
    number: 0,
    createdAt: '',
    updatedAt: '',
    openModal: false,
};
export const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState: initialState,
    reducers: {
        setCurrentOrder: (state, action: PayloadAction<Partial<IOrder>>) => {
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

    }
});
export const {setCurrentOrder,clearCurrentOrder,openModalOrder,closeModalOrderDetails } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;