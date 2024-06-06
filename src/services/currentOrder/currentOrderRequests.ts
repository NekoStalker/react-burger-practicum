import {createAsyncThunk} from '@reduxjs/toolkit'
import {getOrder} from '../api';
import {request} from '../../utils/fetchRequest'
import { ICurrentOrderState, IOrder } from '../types/orderTypes';
export const fetchOrderById = createAsyncThunk<IOrder, string>(
    'currentOrder/fetchOrderById',
    async (orderNumber: string) => {
      const response  = await request<IOrder>(`${getOrder}${orderNumber}`);
      return response;
    }
  );