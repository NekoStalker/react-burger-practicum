import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request} from '../../utils/fetchRequest'
export const apiIngredientsAddr = `${BASE_URL}/ingredients`;
export const getAllIngredients = createAsyncThunk(
    'ingredients/getAllIngredients',
    async () => {
        const response = await request(apiIngredientsAddr);
        return response.data;
    }
);