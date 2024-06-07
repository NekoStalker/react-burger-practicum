import {createAsyncThunk} from '@reduxjs/toolkit'
import {getOrder} from '../api';
import {request} from '../../utils/fetchRequest'
import { ICurrentOrderState, IOrder, IOrderGet } from '../types/orderTypes';
export const fetchOrderById = createAsyncThunk<IOrderGet, string>(
    'currentOrder/fetchOrderById',
    async (orderNumber: string) => {
      const response  = await request<IOrderGet>(`${getOrder}${orderNumber}`, );
      return response;
    }
  );