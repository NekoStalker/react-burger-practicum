import {createSlice} from '@reduxjs/toolkit'

export const ingredientsSlice = createSlice({
    name: 'ingredientInfo',
    initialState: {
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
        
     
    },
    reducers: {
        setCurrentIngredient: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearCurrentIngredient: (state, action) => {
            return initialState;
        },

    }
});