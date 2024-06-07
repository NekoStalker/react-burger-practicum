import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request} from '../../utils/fetchRequest'
import {IGetAllIngredientsPayload} from '../types/ingredientTypes';
export const apiIngredientsAddr = `${BASE_URL}/ingredients`;
export const getAllIngredients = createAsyncThunk<IGetAllIngredientsPayload>(
    'ingredients/getAllIngredients',
    async () => {
        const response: IGetAllIngredientsPayload = await request<IGetAllIngredientsPayload>(apiIngredientsAddr);
        return response;
    }
);