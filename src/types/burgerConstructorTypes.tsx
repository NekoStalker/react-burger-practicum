import {IIngredientState} from './ingredientTypes';
export interface IBurgerConstructorState {
    selectedBun: IIngredientState;
    price: number;
    internalIngredients:  IBurgerConstructorIngredient[];
}
export interface IBurgerConstructorIngredient extends IIngredientState {
    uid: string;
}
export interface IBurgerConstructorStore {
    burgerConstructor: IBurgerConstructorState;
}
