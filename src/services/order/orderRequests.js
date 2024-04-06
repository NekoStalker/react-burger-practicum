import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request} from '../../utils/fetchRequest'
export const apiOrdersAdd = `${BASE_URL}/orders`;
export const getOrderModal = createAsyncThunk(
    'order/getOrderModal',
    async (ingredients) => {
            const reqBody =  {
                "ingredients": Array.from(ingredients).map(element => element._id).filter(id => id),
            }
            const respose = await request(apiOrdersAdd, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            return respose.order;
    }
);

