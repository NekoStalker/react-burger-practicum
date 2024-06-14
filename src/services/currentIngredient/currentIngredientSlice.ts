import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ICurrentIngredientState} from '../types/ingredientTypes';
export const initialState: ICurrentIngredientState = {
    _id: '',
    name: '',
    type: '',
    proteins: -1,
    fat: -1,
    carbohydrates: -1,
    calories: -1,
    price: -1,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: -1,
    openModal: false,
};
export const currentIngredientSlice = createSlice({
    name: 'currentIngredient',
    initialState: initialState,
    reducers: {
        setCurrentIngredient: (state, action: PayloadAction<Partial<ICurrentIngredientState>>) => {
            return { ...state, ...action.payload };
        },
        clearCurrentIngredient: (state) => {
            return initialState;
        },
        openModalIngredient: (state, action: PayloadAction<Partial<ICurrentIngredientState>>) => {
            return { ...state, ...action.payload, openModal:true };
        },
        closeModalIngredient: (state) => {
            return initialState;
        },

    }
});
export const {setCurrentIngredient,clearCurrentIngredient,openModalIngredient,closeModalIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;