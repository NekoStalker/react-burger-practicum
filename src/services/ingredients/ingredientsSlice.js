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
        addIngredientCount: (state, action) => {
            const findElem = state.allIngredients.find((ingredient) => ingredient._id === action.payload._id)
            if(action.payload.type !== "bun"){
                findElem.__v +=1;
            }
            else{
                state.allIngredients = state.allIngredients.map((ingredient) => ingredient.type === "bun" && ingredient._id !== findElem._id ? {...ingredient, __v: 0} : ingredient);
                findElem.__v +=2;
            }
        },
        removeIngredientCount: (state, action) => {
            const findElem = state.allIngredients.find((ingredient) => ingredient._id === action.payload)
            findElem.__v -=1;
        }
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

export const {addIngredient, removeIngredient,addIngredientCount,removeIngredientCount } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;