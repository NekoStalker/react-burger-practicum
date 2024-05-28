import {IAllIngredientsState,ICurrentIngredientState} from "./ingredientTypes";
import {IOrderState} from "./orderTypes";
import {IUserState} from "./userTypes";
import {IBurgerConstructorState} from "./burgerConstructorTypes";
export interface IStore {
    order: IOrderState;
    user: IUserState;
    burgerConstructor: IBurgerConstructorState;
    ingredients: IAllIngredientsState;
    currentIngredient: ICurrentIngredientState;
}
export type TDispatch = (action: any) => Promise<any> | any;

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