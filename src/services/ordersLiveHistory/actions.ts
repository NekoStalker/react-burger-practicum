import { createAction } from "@reduxjs/toolkit";
import { IOrdersResponse } from '../types/orderTypes';
export const ordersHistoryConnect = createAction<string>('ORDERS_History_WS_CONNECT');
export const ordersHistoryDisconnect = createAction('ORDERS_History_WS_DISCONNECT');
export const orderHistoryConnecting = createAction('ORDERS_History_WS_CONNECTING');
export const ordersHistoryMessage = createAction<IOrdersResponse>('ORDERS_History_WS_MESSAGE');
export const ordersHistoryError = createAction<string>('ORDERS_History_WS_ERROR');
export const ordersHistoryOpen = createAction('ORDERS_History_WS_OPEN');
export const ordersHistoryClose = createAction<string, 'ORDERS_History_WS_CLOSE'>('ORDERS_History_WS_CLOSE');

export type TOrdersHistoryActions = ReturnType<typeof ordersHistoryConnect>
                                   | ReturnType<typeof ordersHistoryDisconnect>
                                   | ReturnType<typeof orderHistoryConnecting>
                                   | ReturnType<typeof ordersHistoryMessage>
                                   | ReturnType<typeof ordersHistoryError>
                                   | ReturnType<typeof ordersHistoryOpen>
                                   | ReturnType<typeof ordersHistoryClose>;