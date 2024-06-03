import { buildCreateSlice, createReducer } from '@reduxjs/toolkit';
import {IOrdersResponse,IOrdersState,WebsocketStatus,ordersAction} from '../types/orderTypes';
import {liveOrdersUpdate} from './orders-live-updata'
import {ordersListConnect,ordersListDisconnect ,orderListConnecting,ordersListMessage,ordersListError,ordersListOpen,ordersListClose} from './actions'

const initialState: IOrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: WebsocketStatus.OFFLINE,
    error: null,
}
export const liveListOrder = createReducer(initialState, (builder)=> {
    builder
        .addCase(orderListConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(ordersListOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.error = null;
        })
        .addCase(ordersListError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(ordersListClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(ordersListMessage, (state, action) => {
            state = liveOrdersUpdate(state, action.payload);
    
        });

});
export default liveListOrder; 