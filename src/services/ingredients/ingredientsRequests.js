import {createAsyncThunk} from '@reduxjs/toolkit';
const apiIngredientsAddr = "https://norma.nomoreparties.space/api/ingredients";
export const getAllIngredients = createAsyncThunk(
    'ingredients/getAllIngredients',
    async (_, {rejectWithValue}) => {
        try {
            const res = await fetch(apiIngredientsAddr);
            if (!res.ok) {
                return rejectWithValue('Ошибка запроса ингредиентов');
            }
            const data = await res.json();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);