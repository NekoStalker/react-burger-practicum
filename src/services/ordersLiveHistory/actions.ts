import { createAction } from "@reduxjs/toolkit";
import { IOrdersResponse } from '../types/orderTypes';
export const ordersHistoryConnect = createAction<string>('ORDERS_History_WS_CONNECT');
export const ordersHistoryDisconnect = createAction('ORDERS_History_WS_DISCONNECT');
export const orderHistoryConnecting = createAction('ORDERS_History_WS_CONNECTING');
export const ordersHistoryMessage = createAction<IOrdersResponse>('ORDERS_History_WS_MESSAGE');
export const ordersHistoryError = createAction<string>('ORDERS_History_WS_ERROR');
export const ordersHistoryOpen = createAction('ORDERS_History_WS_OPEN');
export const ordersHistoryClose = createAction<string, 'ORDERS_History_WS_CLOSE'>('ORDERS_History_WS_CLOSE');
