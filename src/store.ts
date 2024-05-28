import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './services/ingredients/ingredientsSlice'
import burgerConstructorSlice from './services/burgerConstructor/burgerConstructorSlice'
import userSlice from'./services/user/userSlice'
import currentIngredientSlice from './services/currentIngredient/currentIngredientSlice'
import orderSlice from './services/order/orderSlice';
const store = configureStore({
    reducer: {
      ingredients: ingredientsSlice,
      burgerConstructor: burgerConstructorSlice,
      currentIngredient: currentIngredientSlice,
      order: orderSlice,
      user: userSlice,
    }, 
  });
export type RootState = ReturnType<any>;
export type AppDispatch = typeof store.dispatch;
export default store;