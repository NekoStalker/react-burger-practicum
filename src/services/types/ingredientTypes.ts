export interface IIngredientState {
    _id: string;
    name: string;
    type: 'main'| 'sauce'|'bun'| '';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number | 0;
}
export interface ICurrentIngredientState extends IIngredientState {
  openModal?: boolean;
}
export type IGetAllIngredientsPayload =  {
  data: IIngredientState[];
}
export interface IAllIngredientsState {
  allIngredients: IIngredientState[];
  isLoading: boolean;
  error: string | null;
}

export interface IIngredientsStore {
  ingredients: IAllIngredientsState;
}
export interface ICurrentIngredientStore {
  currentIngredient: ICurrentIngredientState;
}