// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { IOrdersState, WebsocketStatus, ordersAction } from '../types/orderTypes';
import { liveOrdersUpdate } from './orders-live-update';
import {
  ordersListConnect,
  ordersListDisconnect,
  orderListConnecting,
  ordersListMessage,
  ordersListError,
  ordersListOpen,
  ordersListClose
} from './actions';

const initialState: IOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  error: null,
};

export const liveListOrder = createReducer(initialState, (builder) => {
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
        
      const updatedState = liveOrdersUpdate(state, action.payload);
      return { ...state, ...updatedState };
    });
});

export default liveListOrder;
