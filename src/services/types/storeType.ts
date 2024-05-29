import {IAllIngredientsState,ICurrentIngredientState} from "./ingredientTypes";
import {IOrderState} from "./orderTypes";
import { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { Action } from 'redux';
import {IUserState} from "./userTypes";
import {IBurgerConstructorState} from "./burgerConstructorTypes";
import { RootState, AppDispatch } from '../../store';
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
export interface IStore {
    order: IOrderState;
    user: IUserState;
    burgerConstructor: IBurgerConstructorState;
    ingredients: IAllIngredientsState;
    currentIngredient: ICurrentIngredientState;
}

export interface ApiError {
    statusCode: number;
    message: string;
    details?: string;
  }
  export interface IProtectedRouteElement {
    element: React.ReactNode;
  }
export interface IProtectedUserRouteElement extends IProtectedRouteElement{  
  forGuest: boolean;
  path: string;
}