import {createSlice,nanoid } from '@reduxjs/toolkit'
import update from 'immutability-helper'
export const BUN_NOT_SELECTED = "Выберете булки";
function updatePrice(state) {
    const bunPrice = state.selectedBun.name !== BUN_NOT_SELECTED ? state.selectedBun.price * 2 : 0;
    state.price = state.internalIngredients.reduce((acc, ingredient) => acc + ingredient.price, bunPrice);

}

export const burgerConstructor = createSlice({
    name: 'burgerConstructor',
    initialState: {
        selectedBun: {},
        price: 0,
        internalIngredients: [],
    },
    reducers: {
        addBurgerIngredient: {
            reducer(state, action) {
              if(action.payload.ingredient.type === "bun"){
                state.selectedBun = action.payload.ingredient;
              } else {
                state.internalIngredients.push(action.payload.ingredient);
              }
            
              updatePrice(state);
            },
              prepare(ingredient) {
              return { payload: { ingredient: { ...ingredient, uid: nanoid() } } };
          },
        },
   
        removeBurgerIngredient: (state, action) => {
            state.internalIngredients = state.internalIngredients.filter((ingredient) => ingredient.uid !== action.payload);
            updatePrice(state);
        },
        changeIngredientsOrder: (state, action) =>{
            const { fromUid, toUid } = action.payload;
            const fromIndex = state.internalIngredients.findIndex(ingredient => ingredient.uid === fromUid);
            const toIndex = state.internalIngredients.findIndex(ingredient => ingredient.uid === toUid);
            const newConstructorIngredients = update(state.internalIngredients, {
                $splice: [
                  [fromIndex, 1], 
                  [toIndex, 0, state.internalIngredients[fromIndex]],
                ],
              });
            state.internalIngredients = newConstructorIngredients;
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