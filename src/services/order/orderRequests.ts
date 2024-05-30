import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request,fetchWithRefresh} from '../../utils/fetchRequest'
import {IIngredientState} from '../types/ingredientTypes';
import {ICreatedOrder} from '../types/orderTypes';
export const apiOrdersAdd = `${BASE_URL}/orders`;
export const getOrderModal = createAsyncThunk<ICreatedOrder, IIngredientState[] >(
    'order/getOrderModal',
    async (ingredients: IIngredientState[] ) => {
            if (!ingredients || ingredients.length === 0) {
                throw new Error('No ingredients provided');
            }
            const reqBody =  {
                "ingredients": Array.from(ingredients).map(element => element._id).filter(id => id),
            }
            const respose:ICreatedOrder = await fetchWithRefresh<ICreatedOrder>(apiOrdersAdd, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            return respose;
    }
);

