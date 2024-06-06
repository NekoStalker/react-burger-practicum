// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { IOrdersState, WebsocketStatus, ordersAction } from '../types/orderTypes';
import { liveOrdersUpdate } from './orders-live-update';
import {
  ordersHistoryConnect,
  ordersHistoryDisconnect,
  orderHistoryConnecting,
  ordersHistoryMessage,
  ordersHistoryError,
  ordersHistoryOpen,
  ordersHistoryClose
} from './actions';

const initialState: IOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  error: null,
};

export const liveHistoryOrder = createReducer(initialState, (builder) => {
  builder
    .addCase(orderHistoryConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(ordersHistoryOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = null;
    })
    .addCase(ordersHistoryError, (state, action) => {
      state.error = action.payload.toString();
    })
    .addCase(ordersHistoryClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(ordersHistoryMessage, (state, action) => {
        
      const updatedState = liveOrdersUpdate(state, action.payload);
      return { ...state, ...updatedState };
    });
});

export default liveHistoryOrder;
