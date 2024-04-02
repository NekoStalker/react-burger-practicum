import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    _id: -1,
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
}
export const currentIngredientSlice = createSlice({
    name: 'currentIngredient',
    initialState: initialState,
    reducers: {
        setCurrentIngredient: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearCurrentIngredient: (state, action) => {
            return initialState;
        },
        openModalIngredient: (state, action) => {
            return { ...state, ...action.payload, openModal:true };
        },
        closeModalIngredient: (state, action) => {
            return initialState;
        },

    }
});
export const {setCurrentIngredient,clearCurrentIngredient,openModalIngredient,closeModalIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;