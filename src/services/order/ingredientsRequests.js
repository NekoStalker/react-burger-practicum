import {createAsyncThunk} from '@reduxjs/toolkit';
const apiIngredientsAddr = "https://norma.nomoreparties.space/api/ingredients";
export const getAllIngredients = createAsyncThunk(
    'ingredients/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const res = await fetch("https://norma.nomoreparties.space/api/ingredients");
            if (!res.ok) {

            } 
            const data = await Response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);