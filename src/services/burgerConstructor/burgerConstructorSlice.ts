import {PayloadAction, createSlice,nanoid } from '@reduxjs/toolkit';
import {IBurgerConstructorState, IBurgerConstructorIngredient} from '../types/burgerConstructorTypes';
import {IIngredientState} from '../types/ingredientTypes';
import update from 'immutability-helper';
export const BUN_NOT_SELECTED = "Выберете булки";
function updatePrice(state: IBurgerConstructorState) {
  const bunPrice =  state.selectedBun && state.selectedBun?.name !== BUN_NOT_SELECTED ? state.selectedBun?.price * 2 : 0;
  state.price = state.internalIngredients.reduce((acc, ingredient) => acc + ingredient.price, bunPrice || 0);
}
export const initialState:IBurgerConstructorState = {
  selectedBun: {
    _id: '',
    name: BUN_NOT_SELECTED,
    type: 'bun',
    proteins: -1,
    fat: -1,
    carbohydrates: -1,
    calories: -1,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: -1, 
  },
  price: 0,
  internalIngredients: [],
}
export const burgerConstructor = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBurgerIngredient: {
            reducer(state:IBurgerConstructorState, action: PayloadAction<{ ingredient: IBurgerConstructorIngredient }>)  {
              if(action.payload.ingredient.type === "bun"){
                state.selectedBun = action.payload.ingredient;
              } else {
                state.internalIngredients.push(action.payload.ingredient);
              }
            
              updatePrice(state);
            },
              prepare(ingredient: IIngredientState) {
              return { payload: { ingredient: { ...ingredient, uid: nanoid() } } };
          },
        },
   
        removeBurgerIngredient: (state: IBurgerConstructorState, action: PayloadAction<string>) => {
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
        resetConstructor: (state: IBurgerConstructorState) => {
          return initialState;
        }
    }
});
export const { addBurgerIngredient,removeBurgerIngredient,changeIngredientsOrder,resetConstructor } = burgerConstructor.actions;
export default burgerConstructor.reducer;