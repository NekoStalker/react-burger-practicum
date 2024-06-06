import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request,fetchWithRefresh} from '../../utils/fetchRequest'
import {IIngredientState} from '../types/ingredientTypes';
import {ICreatedOrder} from '../types/orderTypes';
import { getCookie } from '../../utils/cookie';
export const apiOrdersAdd = `${BASE_URL}/orders`;
export const getOrderModal = createAsyncThunk<ICreatedOrder, IIngredientState[] >(
    'order/getOrderModal',
    async (ingredients: IIngredientState[] ) => {
            if (!ingredients || ingredients.length === 0) {
                throw new Error('No ingredients provided');
            }
            const accessToken = getCookie('accessToken');
            const reqBody =  {
                "ingredients": Array.from(ingredients).map(element => element._id),
            }
            const respose:ICreatedOrder = await fetchWithRefresh<ICreatedOrder>(apiOrdersAdd, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(reqBody),
            });
            return respose;
    }
);

