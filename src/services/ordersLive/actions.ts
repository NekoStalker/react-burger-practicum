import { createAction } from "@reduxjs/toolkit";
import { IOrdersResponse } from '../types/orderTypes';
export const ordersListConnect = createAction<string>('ORDERS_LIST_WS_CONNECT');
export const ordersListDisconnect = createAction('ORDERS_LIST_WS_DISCONNECT');
export const orderListConnecting = createAction('ORDERS_LIST_WS_CONNECTING');
export const ordersListMessage = createAction<IOrdersResponse>('ORDERS_LIST_WS_MESSAGE');
export const ordersListError = createAction<string>('ORDERS_LIST_WS_ERROR');
export const ordersListOpen = createAction('ORDERS_LIST_WS_OPEN');
export const ordersListClose = createAction<string, 'ORDERS_LIST_WS_CLOSE'>('ORDERS_LIST_WS_CLOSE');
