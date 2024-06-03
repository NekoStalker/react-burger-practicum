import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './services/ingredients/ingredientsSlice';
import burgerConstructorSlice from './services/burgerConstructor/burgerConstructorSlice';
import userSlice from './services/user/userSlice';
import currentIngredientSlice from './services/currentIngredient/currentIngredientSlice';
import orderSlice from './services/order/orderSlice';
import liveListOrder from './services/ordersLive/reducer';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  ordersListConnect,
  ordersListDisconnect,
  orderListConnecting,
  ordersListMessage,
  ordersListError,
  ordersListOpen,
  ordersListClose,
} from './services/ordersLive/actions';
import { socketMiddleware } from './services/middleware/customMiddleware';

const wsActions = {
  wsConnect: ordersListConnect,
  wsDisconnect: ordersListDisconnect,
  wsConnecting: orderListConnecting,
  onOpen: ordersListOpen,
  onClose: ordersListClose,
  onError: ordersListError,
  onMessage: ordersListMessage,
};

const liveTableMiddleWare = socketMiddleware(wsActions);

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    currentIngredient: currentIngredientSlice,
    order: orderSlice,
    orders: liveListOrder,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(liveTableMiddleWare),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
