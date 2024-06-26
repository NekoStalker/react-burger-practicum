import {createSlice,PayloadAction } from '@reduxjs/toolkit';
import {getAllIngredients } from './ingredientsRequests';
import {IAllIngredientsState,IIngredientState, IGetAllIngredientsPayload} from '../types/ingredientTypes';
const initialState: IAllIngredientsState = {
    allIngredients: [],
    isLoading: false,
    error: null
}
export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredientState>) => {
            state.allIngredients = [...state.allIngredients, action.payload];
            return state
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.allIngredients = state.allIngredients.filter((ingredient) => ingredient._id !== action.payload);
            return state
        },
        addIngredientCount: (state, action: PayloadAction<IIngredientState>) => {
            console.log(action.payload);
            console.log(state.allIngredients.length);
            const findElem = state.allIngredients.find((ingredient) => ingredient._id === action.payload._id)
            console.log(findElem?.__v);
            if(action && action.payload.type !== "bun" && findElem ){
                findElem.__v +=1;
            }
            else if(findElem ){
                state.allIngredients = state.allIngredients.map((ingredient) => ingredient.type === "bun" && ingredient._id !== findElem._id ? {...ingredient, __v: 0} : ingredient);
                findElem.__v =2;
            }
            return state
        },
        removeIngredientCount: (state, action) => {
            const findElem = state.allIngredients.find((ingredient) => ingredient._id === action.payload)
            if(findElem && findElem.__v) 
                findElem.__v -=1;
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllIngredients.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllIngredients.fulfilled, (state, action: PayloadAction<IGetAllIngredientsPayload>) => {
                state.isLoading = false;
                state.allIngredients = action.payload.data;
              })
            .addCase(getAllIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch ingredients';
            })
    }

});

export const {addIngredient, removeIngredient,addIngredientCount,removeIngredientCount } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;