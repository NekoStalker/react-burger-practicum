import {createSlice} from '@reduxjs/toolkit'
import update from 'immutability-helper'
export const BUN_NOT_SELECTED = "Выберете булки";
function updatePrice(state) {
    const bunPrice = state.selectedBun.name !== BUN_NOT_SELECTED ? state.selectedBun.price * 2 : 0;
    state.price = state.internalIngredients.reduce((acc, ingredient) => acc + ingredient.price, bunPrice);
    state.internalIngredients = state.internalIngredients.map((ingredient, index) => ({
        ...ingredient, 
        index: index
    }));
}

export const burgerConstructor = createSlice({
    name: 'burgerConstructor',
    initialState: {
        selectedBun: {},
        price: 0,
        internalIngredients: [],
    },
    reducers: {
        addBurgerIngredient: (state, action) => {
            if(action.payload.type === "bun"){
                state.selectedBun = action.payload;
            } else {
                state.internalIngredients.push(action.payload);
            }
            updatePrice(state);
           
        },
        removeBurgerIngredient: (state, action) => {
            state.internalIngredients = state.internalIngredients.filter((ingredient) => ingredient.index !== action.payload);
            updatePrice(state);
        },
        changeIngredientsOrder: (state, action) =>{
            const {from, to} = action.payload;
            const newConstructorIngredients = update(state.internalIngredients, {
                $splice: [
                  [from, 1], 
                  [to, 0, state.internalIngredients[from]],
                ],
              });
            state.internalIngredients = newConstructorIngredients.map((ingredient, index) => ({
                ...ingredient, index: index
            }));

        },
        resetConstructor: (state) => {
            state.selectedBun = { "name":BUN_NOT_SELECTED,"type":"bun"};
            state.internalIngredients = [];
            state.price = 0;
        }
    }
});
export const { addBurgerIngredient,removeBurgerIngredient,changeIngredientsOrder,resetConstructor } = burgerConstructor.actions;
export default burgerConstructor.reducer;