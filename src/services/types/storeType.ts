import {IAllIngredientsState,ICurrentIngredientState} from "./ingredientTypes";
import {IOrderState} from "./orderTypes";
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import {IUserState} from "./userTypes";
import {IBurgerConstructorState} from "./burgerConstructorTypes";

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
    children?: React.ReactNode | JSX.Element;
  }
export interface IProtectedUserRouteElement extends IProtectedRouteElement{  
  forGuest: boolean;
  path: string;
}
export interface RequestOptions extends RequestInit {
  headers: Record<string, string>;
}

export interface RefreshData {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export interface ITokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}