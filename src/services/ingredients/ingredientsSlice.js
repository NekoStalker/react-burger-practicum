import {createSlice} from '@reduxjs/toolkit'
import {getAllIngredients } from './ingredientsRequests'
import {data} from '../../utils/data';
export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        allIngredients: [],
        isLoading: false,
        error: null
    },
    reducers: {
        addIngredient: (state, action) => {
            state.allIngredients = [...state.allIngredients, action.payload];
        },
        removeIngredient: (state, action) => {
            state.allIngredients = state.allIngredients.filter((ingredient) => ingredient._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllIngredients.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allIngredients = action.payload;
            })
            .addCase(getAllIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }

});

export const {addIngredient, removeIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;